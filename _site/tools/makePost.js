
const rootPath = "./_docs/"          // 배포될 폴더 위치
const listFilePath = "./tools/list"  // 리스트 파일 위치

var list = require('fs').readFileSync(listFilePath).toString().trim().split('\n')
var fs = require('fs');
var rimraf = require("rimraf");

console.log("Total : " + list.length + " README.md files included")
// 디렉토리 삭제(recursive)
// https://www.it-swarm.dev/ko/node.js/%EB%B9%84%EC%96%B4-%EC%9E%88%EC%A7%80-%EC%95%8A%EC%9D%80-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EC%82%AD%EC%A0%9C/1040724882/
rimraf.sync(rootPath)
fs.mkdirSync(rootPath)

for(var i=0; i<list.length; i++){
    var fileDir = list[i]
    var fileName = list[i].split('/')[list[i].split('/').length-2]
    var file = require('fs').readFileSync(fileDir)

    // 특정 README 파일 생략
    if(fileName.includes("scaffold")) continue
    if(fileName.includes("acmicpc-practice")) continue
    
    file = file.toString()

    // ================
    // 가존 README 파일 파싱

    // 문제 제목 따기
    var title = file.substring(file.indexOf("#"), file.length).trim().split('\n')[0]
    title = title.substring(fileName.length+3, title.length).trim()
    title = "["+fileName+"] " + title
    var description = title + " 문제풀이"
    // while(title.includes('/')) title = title.replace('/', '\\')  // 파일 저장 시, 에러 방지


    // 문제 레벨
    var lev = file.substring(file.indexOf("lev:")+4, file.length).trim().split("\n")[0]

    // 태그
    var tag = ""
    var tags = file.substring(file.indexOf("tags:")+5, file.length).trim().split("\n")[0]
    tags = tags.split(',')
    for(var n=0; n<tags.length; n++) if(tags[n] != '') tag += ' - "' + tags[n].trim() + '"\n' // 비어있는 태그 제외하고 모두 추가
    tag = " " + tag.trim()  // 맨 뒤에 붙은 개행 삭제


    // ================
    // README 파일 제작

    var button = '<a href="https://github.com/DokySp/acmicpc-practice/tree/master/' + fileName + '"><button class="btn btn-info">코드 보러가기</button></a>'
    var context = '---\ntitle: "'+title+'"\ndescription: "' + description + '"'
    // 태그가 있을 경우, 태그 추가
    if(tag != ' ') context += '\ntags: \n' + tag  
    context += '\nfeedback: true\n---\n<h1><img src="https://doky.space/assets/icpclev/'+ lev +'.svg" height="37px"> <a href="http://icpc.me/' + fileName + '">' + title + "</a></h1>\n\n" + button + "\n"

    // 기존 파일의 앞부분을 새로운 내용으로 변경
    file = file.trim().split('\n')
    var count = 0
    for(count=0; count<file.length; count++) if(file[count] == '') break; // 실제 내용의 시작지점 찾기
    for(var n=count; n<file.length; n++) context += file[n] + '\n'

    // 파일 생성
    fs.writeFileSync(rootPath + fileName+".md", context)
    console.log(" >> " + fileDir + " →  " + rootPath + fileName+".md")

    // 단순 파일 복사 코드
    // fs.copyFileSync(fileDir, rootPath + "[" + fileName + "] " + title + ".md")
}

// 항상 커밋을 할 수 있도록 파일 내용을 바꾸어 줌
fs.writeFileSync(rootPath+"dummy", Date.now())
console.log()
console.log(list.length + " files was successfully moved to ./_post/ ")
console.log("All process was done! Happy coding!")

