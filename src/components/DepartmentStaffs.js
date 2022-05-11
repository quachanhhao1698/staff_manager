import React from "react";
import { Card, CardImg, Breadcrumb, BreadcrumbItem,CardBody,CardTitle,ButtonGroup,Button } from "reactstrap";
import { Link } from "react-router-dom";

const RenderStaffItem = ({staff,deleteStaff,department}) => {
    const handleDelete =(id) =>{
        if(window.confirm("Xác nhận xóa !")){

            deleteStaff(id)
            department.map(depart => {
                if(staff.departmentId == depart.id){
                    depart.numberOfStaff--;
                }
            });
        }
    }
    return (
            
        <Card className={"mt-3 card-nv"}>
            <ButtonGroup className={"mb-1"}>
                                <Button color='danger'  className="fa fa-trash" onClick={()=>{handleDelete(staff.id)}}></Button>
                                </ButtonGroup>
            <Link to={`/staffs/${staff.id}`}>
                <CardImg className={"cardImg-nv"} width="100%" src={staff.image} alt={staff.name} />
                <CardBody width="100%" className={"cardBody-nv"}>
                    <CardTitle className={"cardTitle-nv"}>{staff.name}</CardTitle>
                </CardBody>
            </Link>
        </Card>
        
    );
};

export  const DepartmentStaffs = (props) => {
    const staffs = props.staff.map((val) => (
        <div className="col-12 col-sm-4 col-md-2 mt-3 mb-3" key={val.id}>
            <RenderStaffItem staff={val} deleteStaff={props.deleteStaff} department={props.departments}/>
        </div>
    ));

    
     if (props.staff != null && props.dept != null) {
        return (
            <div className="container mt-3 mb-3">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/departments">Phòng ban</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dept.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dept.name}</h3> <hr />
                    </div>
                </div>
                <div className="row">{staffs}</div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

