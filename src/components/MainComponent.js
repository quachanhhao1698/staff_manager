import React,{ Component }      from 'react';
import StaffListComponent       from './StaffListComponent';
import {Switch,Route,Redirect,withRouter}  from 'react-router-dom';
import { connect }              from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from './Header';
import Footer from './Footer';
import StaffDetailComponent from './StaffDetailComponent';
import DepartmentsComponent from './DepartmentsComponent';
import { DepartmentStaffs } from './DepartmentStaffs';
import PayrollComponent from './PayrollComponent';
import { deleteStaff,postStaff,fetchStaffs ,fetchDepartments, fetchStaffsSalary} from "../redux/ActionCreators";



const mapStateToProps = state => {
  return{
      staffs: state.staffs,
      departments: state.departments,
      staffsSalary: state.staffsSalary
  }
}

const mapDispatchToProps = (dispatch) => ({
  postStaff: (id, name, doB, salaryScale, startDate, departmentId,annualLeave,overTime,image,salary)=>{dispatch(postStaff(id, name, doB, salaryScale, startDate, departmentId,annualLeave,overTime,image,salary))},
  deleteStaff:(id)=>{dispatch(deleteStaff(id))},
  fetchStaffs: ()=> {dispatch(fetchStaffs())},
  fetchDepartments: ()=>{dispatch(fetchDepartments())},
  fetchStaffsSalary: ()=>{dispatch(fetchStaffsSalary())}
})

class MainComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

  render() {

    const StaffWithId = ({match}) => {
      return(
          <StaffDetailComponent
            staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
            departments={this.props.departments.departments}         
          />
      );
    };

    const DepartmentWithId = ({match}) => {
      return(
          <DepartmentStaffs
              dept={this.props.departments.departments.filter((dept) => dept.id === match.params.deptId)[0]}
              staff={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.deptId)}
              deleteStaff={this.props.deleteStaff}
              departments={this.props.departments.departments}


      />)}

      return(
          <div>
            <Header/>
            <TransitionGroup>
              <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route exact path="/staffs"
                  component={()=> <StaffListComponent staffs={this.props.staffs.staffs}
                  departments={this.props.departments.departments}
                  salary={this.props.staffsSalary.staffsSalary}
                  addStaff={this.props.postStaff}
                  deleteStaff={this.props.deleteStaff}
                  staffsLoading={this.props.staffs.isLoading}
                  staffsErrMess={this.props.staffs.errMess}/> }/>

                <Route path="/staffs/:staffId" component={StaffWithId} />

                <Route exact path="/departments"
                  component={()=> <DepartmentsComponent
                  departments={this.props.departments.departments}
                  departmentsLoading={this.props.departments.isLoading}
                  departmentsErrMess={this.props.departments.errMess} />} />

                <Route path='/departments/:deptId' component={DepartmentWithId} />

                <Route exact path="/staffsSalary"
                  component={()=> <PayrollComponent  payroll={this.props.staffsSalary.staffsSalary}
                  salaryLoading= {this.props.staffsSalary.isLoading}
                  salaryErrMess= {this.props.staffsSalary.errMess} />} />
                
                <Redirect to="/staffs" />
              </Switch>
              </CSSTransition>
            </TransitionGroup>
            <Footer />
            
          </div>
      );

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));

