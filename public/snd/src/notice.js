const noticeContainer = document.getElementById('notice_container');


export default function addNotice (msg) {
  const [ notice, noticeMessage, ] = [ document.createElement('div'), document.createElement('div') ];
  notice.appendChild(noticeMessage);
  noticeContainer.appendChild(notice);
  notice.id = 'notice';
  notice.classList.add('notice');
  noticeMessage.classList.add('notice_message');
  noticeMessage.textContent = msg;
  noticeContainer.classList.remove('notice_added');
  noticeContainer.style.width = `${noticeContainer.children.length * 230}px`;
  setTimeout(() => {
    noticeContainer.classList.add('notice_added');
  }, 10);
  setTimeout(() => {
    notice.classList.add('remove_notice');
    setTimeout(() => {
      notice.remove();
      noticeContainer.style.width = `${noticeContainer.children.length * 230}px`;
    }, 1100);
  }, 5000);
}
