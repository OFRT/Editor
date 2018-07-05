var mdEditor;

// 创建 editormd ，并显示
function openMD(mdSkin, pccss) {

  // 皮肤参数
  var themeSkin;
  var previewThemeSkin;
  var editorThemeSkin;
  // 编辑器配置
  var watchV;

  if (mdSkin == "sun") {
    themeSkin = "default";
    editorThemeSkin = "xq-light";
    previewThemeSkin = "default";
  } else {
    themeSkin = "dark";
    editorThemeSkin = "pastel-on-dark";
    previewThemeSkin = "dark";
  }

  if (pccss) {
    $('#layout').css("height", "85%");
    $('#layout').css("width", "85%");
    watchV = true;
  } else {
    $('#layout').css("height", "85%");
    $('#layout').css("width", "100%");
    watchV = false;
  }

  if ( !mdEditor ) {

    $("#layout").append("<div id=\"my-editormd\" ></div>");
    mdEditor = editormd("my-editormd", {
        width: "100%",
        height: "100%",
        watch: watchV,

        theme : themeSkin,
        previewTheme : previewThemeSkin,
        editorTheme : editorThemeSkin,

        codeFold : true,
        saveHTMLToTextarea : true,
        searchReplace : true,
        htmlDecode : "style,script,iframe|on*",
        emoji : true,
        taskList : true,
        tocm  : true,
        tex : true,
        flowChart : true,
        sequenceDiagram : true,

        toolbarAutoFixed: false,

        onload : function() {
          // console.log('onload', this);
        },
        onfullscreen : function() {
        },
        onfullscreenExit : function() {
        }

    });
  } else {
    $("#my-editormd").show();
    mdEditor.show();
  }
}
// 隐藏 editormd
function hideMD() {
  $("#my-editormd").hide();
  mdEditor.hide();
}
// 移除 editormd
function removeMD() {
  // 清空 mdEditor 原有内容
  mdEditor.clear();
  // mdEditor.remove();
  // 删除编辑器
  mdEditor = null;

  var parent = document.getElementById("layout");
  var child = document.getElementById("my-editormd");
  // 删除 my-editormd 节点下面所有内容
  while(child.hasChildNodes()) child.removeChild(child.firstChild);
  // 删除 my-editormd 节点
  parent.removeChild(child);
}
// 配置 editormd
function configMD() {
  $.get('plugins/editor.md/config/editor.json', function(json) {
    // console.log('config.json', json);
    mdEditor.config(json);
  });
}
// 模板
function changeMouldMD(str, mode) {
  if ( mode == "file" ) {
    // 目标 是文件形式 - str 为 文件的URL
    $.get(str, function(md) {
      mdEditor.setMarkdown(md);
    });
  } else {
    // 目标 是字符串形式 - str 为 String
    mdEditor.setMarkdown(str);
  }
}
// 模块
function appendMouldMD(str, mode) {
  if ( mode == "file" ) {
    // 目标 是文件形式 - str 为 文件的URL
    $.get(str, function(md) {
      mdEditor.appendMarkdown(md);
    });
  } else {
    // 目标 是字符串形式 - str 为 String
    mdEditor.appendMarkdown(str);
  }
}
// 皮肤
function changeSkinMD(mode) {

  if ( mode == "default" ) {
    mode = "sun";
  }
  if ( mode == "sun" ) {
    mdEditor.setTheme("default");
    mdEditor.setCodeMirrorTheme("xq-light");
    mdEditor.setPreviewTheme("default");
  }
  if ( mode == "night" ) {
    mdEditor.setTheme("dark");
    mdEditor.setCodeMirrorTheme("pastel-on-dark");
    mdEditor.setPreviewTheme("dark");
  }
}
