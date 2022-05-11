import React, { Component } from 'react';
import {Col,Card,CardTitle,CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LoadingComponent } from "./LoadingComponent";
import { FadeTransform } from 'react-animation-components';




function RenderDepartments({department}) {
return(
  <FadeTransform in transformProps={{
    exitTransform: 'scale(0.5) translateY(-50%)'
}}>
    <Card key={department.id} className={"card-depart"}>
      <Link to={`departments/${department.id}`}>
        <CardTitle className={"title_depart"}>{department.name}</CardTitle>
      </Link>
        <CardText>Số lượng nhân viên : {department.numberOfStaff}</CardText>
    </Card>
  </FadeTransform>
);
}

export default function DepartmentsComponent(props) {

  const departmentList = props.departments.map((department)=>{
    return(
      <Col className={"col-12 col-md-6 col-lg-4 mt-3"}>
        <RenderDepartments key={department.id} department={department}/>
      </Col>
    );

  });

  if(props.departmentsLoading){
    return(
        <div className="container">
            <div className="row">
                <LoadingComponent/>
            </div>
        </div>
    );
}
else if(props.departmentsErrMess){
    return(
        <div className="container">
            <div className="row">
                 <h4>{props.departmentsErrMess}</h4>
            </div>
        </div>
    );
}
else if(props.departments != null){
  return(
    <div className='container mt-3 '>
       <div className="col-12">
         <h3>Phòng Ban</h3>
         <hr/>
       </div>
      <div className="row">
         <Breadcrumb>
           <BreadcrumbItem><Link to='/nhanvien'>Nhân viên</Link></BreadcrumbItem>
           <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
         </Breadcrumb>
       </div>
      <div className='row mt-3 mb-3 depart'>
       {departmentList}
      </div>
    </div>
  );
}
else return (<div></div>)
}
