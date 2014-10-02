var workflow = angular.module('workflow', []);

workflow.factory('WorkflowService', ['$injector', function($injector) {
    var name = 'WorkflowService';
    var currentNode;

    var start = function(start) {
        this.currentNode = $injector.get(start);
        return this;
    };

    var link = function(source, destination) {
        var src = $injector.get(source);
        var dest = $injector.get(destination);

        console.log(this.name);
        if (!angular.isDefined(src) || !angular.isDefined(dest)) {
            throw new Error('Source or destination could not be found. Source: ' + source + ' - Destination: ' + destination);
        }

        src.link(dest);

        return this;
    };

    var getCurrentNode = function() {
        return this.currentNode;
    }

    var advance = function() {
        var nextNode = this.getCurrentNode().advance()
        this.currentNode = nextNode;

        return this;
    }

    return {
        name: name,
        start: start,
        link: link,
        getCurrentNode: getCurrentNode,
        advance: advance
    }
}]);

workflow.factory('Node', [function() {
    var name;
    var nodes = [];
    var

    var link = function(node) {
        this.nodes.push(node);
    };

    var shouldShow = function(nodeName) {
        return this.name == nodeName;
    };

    var advance = function(name) {
        if (this.nodes.length == 0) {
            throw new Error('Node ' + this.name +' has no linked nodes');
        }
        if (this.nodes.length == 1 || !angular.isDefined(name)) {
            return this.nodes[0];
        }

        for (var i=0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            if (node.getName() == name) {
                return node;
            }
        }

        throw new Error('Node not found: ' + name);
    };

    var getName = function() {
        return this.name;
    };

    return {
        nodes: nodes,
        link: link,
        shouldShow: shouldShow,
        getName: getName,
        advance: advance
    };
}]);

workflow.factory('WelcomeNode', ['Node', function(Node) {
    var welcomeNode = {};
    angular.copy(Node, welcomeNode);
    welcomeNode.name = 'Welcome';

    return welcomeNode;
}]);

workflow.factory('LoginNode', ['Node', function(Node) {
    var loginNode = {};
    angular.copy(Node, loginNode);
    loginNode.name = 'Login';

    return loginNode;
}]);

workflow.factory('ResultNode', ['Node', function(Node) {
    var resultNode = {};
    angular.copy(Node, resultNode);
    resultNode.name = 'Result';

    return resultNode;
}]);