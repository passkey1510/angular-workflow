'use strict';

/**
 * @ngdoc function
 * @name flowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flowApp
 */
angular.module('flowApp')
    .controller('MainCtrl', ['$scope', 'WorkflowService', function ($scope, WorkflowService) {
        $scope.workflowService = WorkflowService;

        WorkflowService.start('WelcomeNode').link('WelcomeNode', 'LoginNode').link('LoginNode', 'ResultNode');
    }]);
