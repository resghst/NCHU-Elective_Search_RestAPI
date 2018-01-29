var ans , ans1
$(document).ready(()=>{
    $.ajax({
        url: "./career_U.json",
        context: document.body
    })
    .then((data)=>{
        console.log(data)
        ans = data['course']
        $.each(data['course'],(ik,iv)=>{
            datadevide(iv)
        })
    })
    console.log("vdsvds")
})

var datadevide= (inputdata)=>{
    var reObj={}
    var search=[
        "obligatory",   // 必選別
        "title_parsed", // 科目名稱
        "code",         // 選課號碼
        "prerequisite", // 先修科目
        "year",         // 全/半年
        "hours",        // 學分數
        "hours",        // 上課時數 
        "time",         // 上課時間
        "intern_time",  // 實習時間
        "location",     // 上課教室
        "intern_location", // 實習教室
        "professor",    // 上課教師
        //, // 實習教師
        "department", // 開課單位
        "number",     // 開課人數
        "language",   // 語言
        "note"        // 備註
        // intern_hours  實習時數
    ]
    $.each(search,(ik,iv)=>{
        reObj[iv] = inputdata[iv]
    })
    if(reObj["intern_time"].length != 0 && reObj["intern_time"].length != 1){
       reObj["intern_hours"] = reObj["intern_time"].length-1
       reObj["intern_professor"] = reObj["professor"]
    }
    if(reObj["intern_time"].length == 1) { reObj["intern_hours"] = "*" }
    if(reObj["time"].length == reObj["intern_time"].length) { reObj["professor"] = "" }

    console.log(reObj)
     
}