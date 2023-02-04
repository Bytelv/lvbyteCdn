const copyTip = "字节君提示您: 借鉴成功!"   // 复制提示, 取消留空字符串 ""
const copyText = "复制代码"   // 复制按钮文字
const copySuccess = "复制成功"    // 复制成功文字
const openText = "-------- 展开 -------"
const closeText = "-------- 收起 -------"
/**
 * 所有class为code的td标签
 */
var codeElementArr = document.querySelectorAll('td.code');
codeElementArr.forEach((code, index) => {
  const preCode = code.children[0].children[0]
  //add id, example: ZYCode1、ZYCode2... 可能以后用到index吧
  // preCode.setAttribute('id','ZYCode'+(index+1))
  preCode.setAttribute('style', '-webkit-line-clamp: 6;')

  //add over
  if (preCode.outerHTML.split('<br>').length > 6) {
    let clickScroll;
    const codeCopyDiv = document.createElement('div');
    codeCopyDiv.setAttribute('class', 'CodeCloseDiv');
    code.parentNode.parentNode.parentNode.parentNode.appendChild(codeCopyDiv);
    const codeCopyOver = document.createElement('button');
    // codeCopyOver.setAttribute('id','ZYCodeOver'+(index+1));
    codeCopyOver.setAttribute('class', 'CodeClose');
    codeCopyOver.innerText = openText;
    const haveDes = code.parentNode.parentNode.parentNode.parentNode.childNodes.length===3
    code.parentNode.parentNode.parentNode.parentNode.children[haveDes?2:1].appendChild(codeCopyOver);

    codeCopyOver.addEventListener('click', async () => {
      codeCopyOver.innerText = codeCopyOver.innerText === openText ? closeText : openText;
      if (codeCopyOver.innerText === openText) {
        document.documentElement.scrollTop = clickScroll;
        preCode.setAttribute('style', '-webkit-line-clamp: 6;');
      } else {
        clickScroll = document.documentElement.scrollTop;
        preCode.setAttribute('style', '-webkit-line-clamp: 99999;')
      }

    })
  }

  // add btn 
  const codeCopyBtn = document.createElement('div');
  codeCopyBtn.classList.add('copy-btn');
  if (copyTip !== "" && copyTip) { codeCopyBtn.setAttribute('onclick', "hud.toast('" + copyTip + "')"); }
  // codeCopyOver.setAttribute('onclick',"util.copy('ZYCode"+(index+1)+"','借鉴成功')"); 自带方法不行哦,会报错select()
  // codeCopyBtn.style.right = Number(codeBeforeWidth) + Number(codeBeforePadding) * 2 + 'px'; // 舍弃计算,防止tabs标签里的before为零, 默认right五个字符
  codeCopyBtn.style.right = '70px';
  codeCopyBtn.innerText = copyText;
  code.appendChild(codeCopyBtn);

  //add fun
  codeCopyBtn.addEventListener('click', async () => {
    const currentCodeElement = code.children[0]?.innerText;
    await copyCode(currentCodeElement);

    codeCopyBtn.innerText = copySuccess;
    codeCopyBtn.classList.add('success');

    setTimeout(() => {
      codeCopyBtn.innerText = copyText;
      codeCopyBtn.classList.remove('success');
    }, 3000)

  })
})

async function copyCode(currentCode) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(currentCode)
    } catch (error) {
      // 未获得用户许可
      console.error(error)
    }
  } else {
    console.error('当前浏览器不支持此api')
  }
}
