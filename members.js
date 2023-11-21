function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'modules/members/views/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '=',
        }
    };
}
