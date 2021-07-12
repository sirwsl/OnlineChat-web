
const myself = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const userId = myself ? myself.id : "0";
let temp = [
]
if (JSON.stringify(userId)==JSON.stringify("456788765678765")){
  temp = [{
    id: "456788765678766",
    avatar: '//game.gtimg.cn/images/lol/act/img/champion/Fizz.png',
    nickname: '66',
    message: '你抓不到我！',
    date: '02-07',
  }]
}else{
  temp = [{
    id: "456788765678765",
    avatar: '//game.gtimg.cn/images/lol/act/img/champion/Khazix.png',
    nickname: '65',
    message: '❓',
    date: '02-07',
  }]
}
export const contactList = temp

export const contact = {
  id: 456788765678765,
  avatar: '//game.gtimg.cn/images/lol/act/img/champion/Khazix.png',
  nickname: '卡兹克',
  desc: '看我点水就完了',
}

export const my = {
  id: 456788765678766,
  avatar: '//game.gtimg.cn/images/lol/act/a20201103lmpwjl/icon-ht.png',
  nickname: 'sirosong',
  desc: 'carry大神',
}

export const messageList = [
  {
    _id: 'ecbb310507ce9c7d3bd57eca046a80f3',
    date: 1610016000,
    user: {
      id: 456788765678765,
      avatar: '//game.gtimg.cn/images/lol/act/a20201103lmpwjl/icon-ht.png',
      nickname: 'sirosong',
      desc: '这是我的第一条信息',
    },
    message: { type: 'text', content: '打野你会玩吗？' },
  }
]
