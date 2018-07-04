/**
 * zeroModal 对话框 插件 参数
 **/
// title：标题。
// content：显示内容。
// url：如果输入url，将会根据url返回的内容显示在弹出层中。
// iframe：是否需要嵌入iframe，默认 false，该参数需要和url一起使用。
// width：宽度（px、pt、%）。
// height： 高度（px、pt、%）。
// transition：是否需要出场动画，默认 false。
// overlay：是否需要显示遮罩层，默认true。
// overlayClose：是否允许点击遮罩层直接关闭弹出层，默认 false。
// opacity： 遮罩层的透明度，默认0.2。
// resize：是否允许调整大小，默认 false。
// resizeAfterFn：调整大小后触发的事件。
// ok：是否启用“ok”按钮，默认 false。
// okTitle：ok”按钮的显示值，默认为“确定”。
// okFn：点击“ok”按钮触发的事件。
// cancel：是否启用“cancel”按钮，默认 false。
// cancelTitle：cancel”按钮的显示值，默认为“取消”。
// cancelFn：点击“cancel”按钮触发的事件。
// buttons：自定义的按钮，使用了自定义按钮ok与cancel按钮将不会生效；格式：`[{ className: 'zeromodal-btn zeromodal-btn-primary', name: '开始导出' }]`。
// esc：是否需要按esc键退出弹出层，默认 false。
// onOpen：弹出层弹开前事件。
// onLoad：弹出层加载显示内容前事件。
// onComplete：弹出层加载显示内容后事件。
// onCleanup：弹出层关闭前事件。
// onClosed：弹出层关闭后事件。
// unique：模态框的唯一值，默认系统生成UUID，不建议自定义。

// zeroModal.show(opt)：显示普通的模态框，opt为参数对象，参数内容请参考上面的列表。
// zeroModal.close(opt/unique)：关闭模态框。
// zeroModal.closeAll()：关闭全部模态框。
// zeroModal.loading(type)：显示等待框，type为显示等待的类型，目前提供的值为（1、2、3、4、5、6）。
// zeroModal.alert(content/opt)：显示提示框。
// zeroModal.error(content/opt)：显示错误提示框。
// zeroModal.success(content/opt)：显示正确提示框。
// zeroModal.confirm(content/opt, okFn)：显示确认框。

// 重命名 - 保存时，文件后缀问题
function reName(name, defaultName) {
  var defaultSuffix = defaultName.lastIndexOf(".");
  var suffix = name.lastIndexOf(".");

  if (suffix < 0) {
    defaultSuffix = defaultName.substring(defaultSuffix, defaultName.length);
  } else {
    defaultSuffix = defaultName.substring(defaultSuffix, defaultName.length);
    name = name.substring(0, suffix-1);
  }
  return name + defaultSuffix;
}

// 打开 - 对话框 - 主要针对要打开的文件 - 请传入 编辑器对象
function openDialog(objEditor) {
  if (ifpc) {
    widthV = '55%';
    heightV = '65%';
  } else {
    widthV = '85%';
    heightV = '30%';
  }

  zeroModal.show({
      title: '打开',
      content: "待测试...",
      // url:'',
      transition:true,
      opacity: 0.9, // 遮罩层的透明度
      ok: true,
      cancel: true,
      esc: true,
      width: widthV, //宽度（px、pt、%）
      height: heightV, //高度（px、pt、%）
      okFn: function() {
        console.log("OK fn");
      }
  });
}

// 保存 - 对话框 - 请传入要保存的数据
function saveDialog(saveData) {

  if (ifpc) {
    widthV = '20%';
    heightV = '30%';
  } else {
    widthV = '85%';
    heightV = '30%';
  }

  // 获取 网页上的 文件名
  var fName = document.getElementById('a-fileName').innerHTML;

  // 判断 要保存的数据 是否 为 null
  if (!saveData) {
    console.log("保存失败！编辑器为空");
    zeroModal.error('保存失败！编辑器为空');
  } else {
    zeroModal.show({
      title: '保存',
      // content: "<input id=\"input_name\" type=\"text\" class=\"form-control search-menu\" placeholder=\"请输入文件名\" value=\""+fName+"\">",
      url:'plugins/zeroModal/code/input.html',
      transition:true,
      ok: true,
      cancel: false,
      esc: true,
      width: widthV, //宽度（px、pt、%）
      height: heightV, //高度（px、pt、%）
      okFn: function() {
        // 查找对应ID的输入框，如果存在就把它的 value 赋给 fName。
        if ( document.getElementById('input_name') ) {
          if ( document.getElementById('input_name').value != "" ) {
            // 更新后缀
            fName = reName(document.getElementById('input_name').value, fName);
            // 更新网页文件名
            document.getElementById('a-fileName').innerHTML = fName;
          }
        }
        // 保存文件
        var blob = new Blob([saveData], {
            type: "application/txt;charset=utf-8"
        });
        saveAs(blob, fName);
        // 保存成功的提示
        console.log(fName + " 保存成功!");
        zeroModal.success(fName + " 保存成功!");
      }
    });
  }
}
// 提示信息对话框
function foreword() {

  if (ifpc) {
    widthV = '55%';
    heightV = '65%';
  } else {
    widthV = '85%';
    heightV = '30%';
  }

  zeroModal.show({
      title: '前言',
      content: "待更新...",
      // url:'foreword.txt',
      transition:true,
      opacity: 0.9, // 遮罩层的透明度
      ok: true,
      cancel: false,
      esc: true,
      width: widthV, //宽度（px、pt、%）
      height: heightV, //高度（px、pt、%）
      okFn: function() {
        console.log("OK fn");
      }
  });
}

// 对话框测试
function dialog_test1() {
  console.log("dialog_test1");
  zeroModal.show({
      title: 'hello world',
      // content: 'this is zeroModa',
      url:'README.md',
      transition:true,
      ok: true,
      cancel: true,
      esc: true,
      okFn: function() {
        console.log("OK fn");
      }
  });
}
function dialog_test2() {
  console.log(this.document.URL);
}
