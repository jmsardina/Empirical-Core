'use strict'

EC.EducatorType = React.createClass({

  getInitialState: function() {
    return ({stage: 1});
  },

  goToStage:function(num){
    this.setState({stage: num});
  },

  goToProfile: function () {
    window.location = '/profile';
  },


  selectSchool: function (school_id_or_type) {
    this.props.analytics.track('select school');
    $.ajax({
      type: 'PUT',
      url: '/select_school',
      data: {
        school_id_or_type: school_id_or_type
      },
      success: this.goToProfile
    });
  },



  stateSpecificComponents: function(){
    if (this.state.stage === 1) {
      return (
        <div className='educator-type'>
          <h3>Are you a faculty member at a U.S K-12 School?*</h3>
           <div className='option-wrapper'>
             <button className='button-green' onClick={() => this.goToStage(2)}>Yes</button>
             <button className='button-green' onClick={() => this.goToStage(3)}>No</button>
           </div>
           <div>
             *K-12 is a term for school grades prior to college.<br/>
             These grades span from kindergarten through the 12th grade.
           </div>
        </div>
      );
    } else if (this.state.stage === 2) {
      return (
        <EC.UsK12View analytics={this.props.analytics} goToProfile={this.goToProfile} selectSchool={this.selectSchool}/>
      );
    } else if (this.state.stage === 3) {
      return (
        <EC.notUSK12View analytics={this.props.analytics} selectSchool={this.selectSchool}/>
      )
    }
  },

  render: function(){
    return(this.stateSpecificComponents());
  }
});
