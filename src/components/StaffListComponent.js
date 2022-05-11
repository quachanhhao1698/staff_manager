import React,{ useRef, useState} from "react";
import {Card,CardImg,CardBody,CardTitle,Button,Col,Row,Container,Input,Modal,ModalBody,ModalHeader,Form,FormGroup,Label, ButtonGroup,FormFeedback} from 'reactstrap';
import { Link} from 'react-router-dom';
import '../App.css';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {LoadingComponent} from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';



function RenderStaffs({staff,deleteStaff,department}){

    
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

    
    return(
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
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
        </FadeTransform>
    );
}

function Department({department}) {
    
    return(
        <option key={department.id} value={department.id}>{department.name}</option>
    );
}

function StaffListComponent(props) {    

        const [col, setCol] = useState(0); 
        // Số lượng nhân viên
        let countStaffs=props.staffs.length;

        // const[keyWord, setKeyWord]= useState('');
        const inputRef = useRef(null);
        const [toggleModal,setToggleModal] = useState(false);
        const [searchItem, setSearchItem] = useState('');

        const [name, setName] = useState('');
        const [dOB, setDOB] = useState('');
        const [salaryScale, setSalaryScale] = useState('1');
        const [startDate, setStartDate] = useState('');
        const [department, setDepartment] = useState('Dept01');
        const [annualLeave, setAnnualLeave] = useState('0');
        const [overTime, setOverTime] =useState('0');

        const [newStaffs, setNewStaffs] = useState([]);

        const staffDepartment = props.departments.map((department,index)=>{
            return(
                    <Department department={department} index={index}/>             
            );
        })
        console.log("department >>",props.departments);
        
        // console.log("staffList >>",props.staffs);  
        const staffList = props.staffs
        //Lọc nhân viên có tên trùng với keyword
        .filter((val) => {
            if(searchItem === "") {
                return val;
            }
            else if(val.name.toLowerCase().includes(searchItem.toLocaleLowerCase())) { 
                return val;
            }
        })
        //Hiển thị danh sách nhân viên
        .map((staffs)=> {
            
            return (
                
                <Col key={staffs.id} xs={col || "6"} md={col || "4"} lg={col || "2"} className={"mt-3"} >
                        <RenderStaffs staff={staffs} onclick={props.onClick} isLoading={props.staffsLoading}
                        errMess={props.staffErrMess} deleteStaff={props.deleteStaff} department={props.departments} />
                </Col>
            );
        });

        const handleSearch = () =>{
           setSearchItem(inputRef.current.value);
        }
        // Làm trống dữ liệu ô input trong form
        const clearInput = () =>{
            setName('');
            setDOB('');
            setSalaryScale('1');
            setStartDate('');
            setDepartment('');
            setAnnualLeave('0');
            setOverTime('0');
        }
        // Thêm nhân viên
        // const handleSubmitAdd= () =>{
        //     let staffId = countStaffs + 1;
        //     let newStaff = {    id:staffId,
        //                         name: name,
        //                         doB: dOB,
        //                         salaryScale: salaryScale,
        //                         startDate: startDate,
        //                         departmentId: department,
        //                         annualLeave:annualLeave,
        //                         overTime:overTime,
        //                         image: '/asset/images/alberto.png' };
        
        //     props.departments.map(depart => {
        //         if(department == depart.id){
        //             depart.numberOfStaff++
        //         }
        //     })

        //     props.staffs.push(newStaff);
        //     props.salary.push(newStaff)
        //     setNewStaffs([...newStaffs, newStaff]);
        //     setToggleModal(false);
        //     clearInput();
            
                    
        // }

        // Sử dụng post
        const handleSubmitAdd = () =>{
            let staffId = countStaffs + 1;
            const basicSalary = 3000000;
            const overTimeSalary = 200000;
            const salary = (parseFloat(salaryScale) * basicSalary) + (parseFloat(overTime) * overTimeSalary);
            props.addStaff(staffId,name,dOB,salaryScale,startDate,department,annualLeave,overTime,'/assets/images/alberto.png',salary);
            props.departments.map(depart => {
                        if(department == depart.id){
                            depart.numberOfStaff++
                        }
                    });

            setToggleModal(false);
            clearInput();
        }

        const handleEdit = (id)=>{
            alert("id: " , id)
        }
        
        // Validate Form
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        

        
        if(props.staffsLoading){
            return(
                <div className="container">
                    <div className="row">
                        <LoadingComponent/>
                    </div>
                </div>
            );
        }
        else if(props.staffsErrMess){
            return(
                <div className="container">
                    <div className="row">
                         <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
         if(staffList != null){
            return(
                
                <Container>               
                   <Row>
                   <Col className="col-12">
                        <h3 className="mt-3">Nhân Viên</h3>
                        <hr/>
                    </Col>
                                   
                   </Row>    
                    <Row>
                        <Col className="col-12 col-sm-6 col-md-9">
                            <h5>Chọn số cột</h5>
                            <ButtonGroup>
                                <Button onClick={() => setCol(0)}>Mặc định</Button>
                                <Button onClick={() => setCol(6)}>2</Button>
                                <Button onClick={() => setCol(4)}>3</Button>
                                <Button onClick={() => setCol(3)}>4</Button>
                            </ButtonGroup>
                        </Col>
    
                        <Col className="col-12 col-md-12 mt-2">
                            <h5>Số lượng nhân viên : {countStaffs}</h5>
                        </Col>
                        
                    </Row>
                    <Row>
                        {/* Search sử dụng controlled */}
    
                        {/* <Col className={'col-12 col-md-5 mt-2'}>
                            <Input type="text" id="search" name="search" value={keyWord}
                                    placeholder="Tìm kiếm"
                                    onChange={(e)=>{ setKeyWord(e.target.value)}}
                            />
                        </Col>
                        <Col className={'col-12 col-md-3 mt-2'}>
                            <Button color='primary' onClick={handleSearch}>Tìm</Button>
                        </Col> */}
    
                        {/* Search sử dụng uncontrolled  */}
                        <Col className={'col-12 col-md-5 mt-2'}>
                            <Form>
                                <Input type="text" id="search" name="search" placeholder="Tìm kiếm" innerRef={inputRef} />    
                            </Form>
                        </Col>
                        <Col className={'col-12 col-md-3 mt-2'}>
                            <ButtonGroup>
                                <Button color='primary' onClick={handleSearch}>Tìm</Button>
                                <Button color='danger' onClick={()=> inputRef.current.value=""}>Xóa</Button>
                            </ButtonGroup>
    
                        </Col>
                        
    
                        <Col className="col-12 col-md-4">
                            <Button className="mt-2" color='success'
                                    onClick={()=>{setToggleModal(!toggleModal)}}
                            >
                                <i className="fa fa-plus"></i> Thêm nhân viên</Button>
                        </Col>
                    </Row>             
                    <Row>                    
                        {staffList}
                    </Row>
                    <Row className={"m-3"}>
                        <h5>Bấm vào nhân viên để xem thông tin</h5>
                        <br/>
                       
                    </Row>
                    {<Modal isOpen={ toggleModal } toggle={ ()=> setToggleModal(false) } centered >
                        <ModalHeader toggle={ ()=> setToggleModal(false) } tag={"h4"}>Thêm nhân viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={handleSubmitAdd}>
                                {/* Họ và tên */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="staffName" md={4}>Tên</Label>
                                    <Col md={8}>
                                        <Control.text   model=".staffName" id="staffName" name="staffName" className="form-control"
                                                        placeholder="Nhập họ và tên" value={ name }
                                                        onChange={ (e)=> setName(e.target.value) }
                                                        validators={{
                                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                                        }}
                                                         />
                                                    <Errors
                                                        className="text-danger mt-1"
                                                        model=".staffName"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Vui lòng nhập ',
                                                            minLength: 'Yêu cầu hơn 2 kí tự',
                                                            maxLength: 'Yêu cầu dưới 30 kí tự'
                                                        }}
                                                     />
                                    </Col>
                                </Row>
                                {/* Ngày sinh */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="dOB" md={4}>Ngày sinh</Label>
                                    <Col md={8}>
                                        <Control        type="date" model=".dOB" id="dOB" name="dOB" className="form-control"
                                                        value={ dOB }
                                                        onChange={ (e)=> setDOB(e.target.value) }
                                                        validators={{
                                                            required
                                                        }}
                                                         />
                                                    <Errors
                                                        className="text-danger mt-1"
                                                        model=".dOB"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Vui lòng nhập'
                                                        }}
                                                     />
                                    </Col>
                                </Row>
                                {/* Ngày vào công ty */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                    <Col md={8}>
                                        <Control        type="date" model=".startDate" id="startDate" name="startDate" className="form-control"
                                                        value={ startDate }
                                                        onChange={ (e)=> setStartDate(e.target.value) } 
                                                        validators={{
                                                            required
                                                        }}
                                                         />
                                                    <Errors
                                                        className="text-danger mt-1"
                                                        model=".startDate"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Vui lòng nhập'
                                                        }}
                                                     />
                                    </Col>
                                </Row>
                                {/* Phòng ban */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="department" md={4}>Phòng ban</Label>
                                    <Col md={8}>
                                        <Control.select model=".department" id="department" name="department" className="form-control"
                                                        value={ department }
                                                        onChange={ (e)=> setDepartment(e.target.value) } >
                                            { staffDepartment } 
                                        </Control.select>
                                    </Col>
                                    
                                </Row>
                                {/* Hệ số lương */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                    <Col md={8}>
                                        <Control.text   model=".salaryScale" id="salaryScale" name="salaryScale" className="form-control"
                                                        placeholder="1 -> 3"
                                                        value={ salaryScale }
                                                        onChange={ (e)=> setSalaryScale(e.target.value) }/>
                                    </Col>
                                </Row>
                                {/* Số ngày nghỉ */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                    <Col md={8}>
                                        <Control.text   model=".annualLeave" id="annualLeave" name="annualLeave" className="form-control"
                                                        value={ annualLeave }
                                                        onChange={ (e)=> setAnnualLeave(e.target.value) } />
                                    </Col>
                                </Row>
                                {/* Số ngày đã làm thêm */}
                                <Row className={"form-group mb-3"}>
                                    <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                    <Col md={8}>
                                        <Control.text   model=".overTime" id="overTime" name="overTime" className="form-control"
                                                        value={ overTime }
                                                        onChange={ (e)=> setOverTime(e.target.value) } />
                                    </Col>
                                </Row>
                                {/* Button submit */}
                                <Row className={"form-group"}>
                                    <Col md={{size: 10,offset: 2}}>
                                        <Button color="success" outline block type="submit">Thêm</Button>
                                    </Col>
                                </Row>    
                            </LocalForm>
                        </ModalBody>
                       
                    </Modal>              
                    }   
                </Container>
            );
        }

        else return(<div> null</div>);
        
    
}

export default StaffListComponent ;
