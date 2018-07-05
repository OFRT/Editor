var indexSkin;
var myDebug = false;

// 关闭 Debug 模式
function closeDebug() {
  screenLog.destroy();
  $("#li-debug").hide();
}
// 清空 Debug LOG
function clearLog() {
  screenLog.clear();
  console.log("Debug LOG clear OK!");
}
//
function markdownEditor() {
  // 打开编辑器
  openMD(indexSkin, ifpc);
  // 设置标题
  document.getElementById("a-header").innerHTML = "Markdown编辑器";
  if (document.getElementById('a-fileName').innerHTML=="") {
    document.getElementById('a-fileName').innerHTML = "untitled.md";
  }
}
// 主页初始化
function indexInit() {

  // 前言
  if (ifpc) {
    setTimeout('foreword()', 2000);
    // foreword();
  } else {
    zeroModal.error('暂不支持手机编辑');
  }

  // debug 模式
  if (myDebug) {
    screenLog.init();
    $("#li-debug").show();
  } else {
    $("#li-debug").hide();
  }

  if ( !mdEditor ) {
    autoOpenMD();
    // 配置放入初始化里面了
    // configMD();
  }

}
function changeSkin(mode) {
  indexSkin = mode;
  // index 皮肤变化
  if ( mode == "default" ) {
    mode = "sun";
  }
  if ( mode == "sun" ) {
    indexSkinSun();
  }
  if ( mode == "night" ) {
    indexSkinNight();
  }

  /* 其它模块变化 */
  // mdEditor 模块
  if (mdEditor) changeSkinMD(mode);

}
// 自动判断访问者时间 - 白天 or 晚上
function autoOpenMD() {
  var now = new Date();
  var hour = now.getHours();
//console.log("当前是：",hour + "点");

  // 先换主页皮肤，再打开 Editor.md
  // 白天
  if ( 6 <= hour && hour <= 18 ) {
//  console.log("白天");
    // 1
    indexSkinSun();
    // 2
    openMD("sun", ifpc);
  } else {
//  console.log("晚上");
    // 1
    indexSkinNight();
    // 2
    openMD("night", ifpc);
  }
  document.getElementById("a-header").innerHTML = "Markdown编辑器";
  document.getElementById('a-fileName').innerHTML = "untitled.md";
}

// 主页皮肤
// 1.白天
function indexSkinSun() {
  $("body").css("background","#cccef1");
  $("body").css("color","#222222");
  $("#div-desktop-menu").css("color","#ff0080");
  $("#a-header").css("color","");
}
// 2.晚上
function indexSkinNight() {
  $("body").css("background","#494A5F");
  $("body").css("color","#D5D6E2");
  $("#div-desktop-menu").css("color","#d5d6e2");
  $("#a-header").css("color","#fff");
}

// 主要功能
// 打开
function openFile() {
  if (mdEditor) openDialog(mdEditor);
}
// 保存
function save() {
  if (mdEditor) saveDialog(mdEditor.getMarkdown());
}
// 清空输入
function clearData() {
  if (mdEditor) {
    if (mdEditor.getMarkdown() != "") {
      mdEditor.clear();
      zeroModal.success("已清空编辑器~");
    } else {
      zeroModal.error("编辑器为空！");
    }
  }
}
// 搜索
function search() {
  mdEditor.serach('find');
  console.log('serach');
}
// 加载时，立即执行的部分
jQuery(function($) {
  indexInit();

  // fileName 被点击的事件
  $("#a-fileName").click(function(){
    if (document.getElementById('a-fileName').innerHTML == "untitled.md") {
      if (mdEditor && mdEditor.getMarkdown() == "") {
        openDialog(mdEditor);
      } else {
        save();
      }
    } else {
      save();
    }
  });
});
