//统一api管理
import instance from "./axios";
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const adCatePage=(data)=>{
   return instance.request({
    url:'api/adcate/page',
    method:'post',
    data
   })
}
const adCateDelId=(params)=>{
    return instance.request({
        url:'api/adcate/delete',
        params
    })
}
const adCateAdd=(data)=>{
    return instance.request({
        url:'api/adcate/add',
        method:'post',
        data
    })
}

const adCateEdit=(data)=>{
    return instance.request({
        url:'api/adcate/edit',
        method:'post',
        data
    })
}
//学校接口
const allSchool=(data)=>{
    return instance.request({
        url:'api/school/all',
        method:'get',
    })
}
const delSchool=(params)=>{
    return instance.request({
        url:'api/school/delete',
        method:'get',
        params:params
    })
}
const addSchool=(data)=>{
    return instance.request({
        url:'api/school/add',
        method:'post',
        data
    })
}
const editSchool=(data)=>{
    return instance.request({
        url:'api/school/edit',
        method:'post',
        data
    })
}
// const isEven = n => n % 2 === 0;
//宿舍接口
const allDormitory=(data)=>{
    return instance.request({
        url:'api/dormitory/all',
        method:'get',
    })
}
const delDormitory=(params)=>{
    return instance.request({
        url:'api/dormitory/delete',
        method:'get',
        params:params
    })
}
const addDormitory=(data)=>{
    return instance.request({
        url:'api/dormitory/add',
        method:'post',
        data
    })
}
const editDormitory=(data)=>{
    return instance.request({
        url:'api/dormitory/edit',
        method:'post',
        data
    })
}

//建筑接口
const allBuilding=(data)=>{
    return instance.request({
        url:'api/building/all',
        method:'get',
    })
}
const delBuilding=(params)=>{
    return instance.request({
        url:`api/building/delete/${params.id}`,
        method:'get',
    })
}
const addBuilding=(data)=>{
    return instance.request({
        url:'api/building/add',
        method:'post',
        data
    })
}
const editBuilding=(data)=>{
    return instance.request({
        url:'api/building/edit',
        method:'post',
        data
    })
}

//宿舍学生接口
const allStudent=(data)=>{
    return instance.request({
        url:'api/dormitory-student/all',
        method:'get',
    })
}
const delStudent=(params)=>{
    return instance.request({
        url:`api/dormitory-student/delete/${params.id}`,
        method:'get',
    })
}
const addStudent=(data)=>{
    return instance.request({
        url:'api/dormitory-student/add',
        method:'post',
        data
    })
}
const editStudent=(data)=>{
    return instance.request({
        url:'api/dormitory-student/edit',
        method:'post',
        data
    })
}
export {
    allStudent,
    delStudent,
    addStudent,
    editStudent,
    editBuilding,
    addBuilding,
    delBuilding,
    allBuilding,
    editDormitory,
    addDormitory,
    delDormitory,
    allDormitory,
    editSchool,
    addSchool,
    delSchool,
    allSchool,
    userLogin,
    adminLogin,
    adCatePage,
    adCateDelId,
    adCateAdd,
    adCateEdit
} 