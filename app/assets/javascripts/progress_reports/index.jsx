$(function() {
  var ele = $('.student-reports-subnav.tab-subnavigation-wrapper');
  if (ele.length > 0) {
    React.render(React.createElement(EC.PremiumBannerBuilder), $(ele[0]).next()[0]);
  }

  var progressReportMapping = {
    '.progress-reports-activities': EC.ActivitiesProgressReport,
    '.progress-reports-standards-classrooms': EC.StandardsAllClassroomsProgressReport,
    '.progress-reports-standards-classroom-students': EC.StandardsClassroomStudentsProgressReport,
    '.progress-reports-standards-topics': EC.StandardsTopicsProgressReport,
    '.progress-reports-standards-classroom-topics': EC.StandardsClassroomTopicsProgressReport,
    '.progress-reports-standards-topic-students': EC.StandardsTopicStudentsProgressReport,
    '.progress-reports-concepts-students': EC.ConceptsStudentsProgressReport,
    '.progress-reports-concepts-concepts': EC.ConceptsConceptsProgressReport
  };

  _.each(progressReportMapping, function(component, rootNodeSelector) {
    var $el = $(rootNodeSelector);
    if ($el.length) {
      $.get('/teachers/classrooms/premium.json').done(function(data) {
        var props = {
          sourceUrl: $el.data('url'),
          premiumStatus: data.hasPremium
        };
        React.render(React.createElement(component, props), $el[0]);
      });
    }
  });
});
