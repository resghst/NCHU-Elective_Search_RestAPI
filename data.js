var ll = {}
$(document).ready(()=>{
    var U_Obj = {}
    var queryFile =[ "/career_U.json", "/career_O.json", "/career_N.json" ]
    var changeTable = { "/career_U.json": "U", "/career_O.json": "O", "/career_N.json": "N", }
    $.each(queryFile, (k,v)=>{ U_Obj[changeTable[v]] = get(v) })
    ll = U_Obj
    console.log(U_Obj)
})

var get = (File) => {
    var reObj = {}
    console.log(File)
    $.ajax({ url: File })
    .then((data) => {
        $.each(data['course'],(ik,iv)=>{ reObj[ik] = get_management(iv) })
    })
    return reObj
} 

var get_management = (inputdata) => {
    var reObj={}
    var search=[
        "obligatory",   // 必選別
        "title_parsed", // 科目名稱
        "code",         // 選課號碼
        "prerequisite", // 先修科目
        "year",         // 全/半年
        "credits",      // 學分數
        "hours",        // 上課時數 
        "time",         // 上課時間
        "intern_time",  // 實習時間
        "location",     // 上課教室
        "intern_location", // 實習教室
        "professor",    // 上課教師
        // "intern_professor" 實習教師
        "department", // 開課單位
        "number",     // 開課人數
        "language",   // 語言
        "note",       // 備註
        "url"         //連結
        // "intern_hours"  實習時數
    ]
    $.each(search,(ik,iv)=>{ reObj[iv] = inputdata[iv] })
    if(reObj["intern_time"].length != 0 && reObj["intern_time"].length != 1){
       reObj["intern_hours"] = reObj["intern_time"].length-1
       reObj["intern_professor"] = reObj["professor"]
    }
    if(reObj["intern_time"].length == 1) { reObj["intern_hours"] = "*" }
    if(reObj["time"].length == reObj["intern_time"].length) { reObj["professor"] = "" }
    return reObj 
}