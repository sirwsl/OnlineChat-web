import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/***
 * 获取验证码
 * @param req
 * @param res
 */
async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

/***
 * 登录
 */
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    if (password === 'admin' && userName === 'admin') {
      res.send({
        code: 0,
        status: "SUCCESS",
        userMsg: "操作成功",
        data:{
            Authorization:"sdadsas54a8s.dasdas.57s7adasd.asd8",
            avatar:"https://b3logfile.com/avatar/1588874010907_1591960013221.jpeg?imageView2/1/w/128/h/128/interlace/0/q/100",
          name:"sad123",
          nickName:"测试姓名66",
          id:"456788765678766",
          authority:"admin"
        }
      });
      return;
    }
    if (password === 'user' && userName === 'user') {
      res.send({
        code: 0,
        status: "SUCCESS",
        userMsg: "操作成功",
        data:{
          Authorization:"sdadsas54a8s.dasdas.57s7adasd.asd8",
          avatar:"https://b3logfile.com/avatar/1588874010907_1591960013221.jpeg?imageView2/1/w/128/h/128/interlace/0/q/100",
          name:"sad123",
          nickName:"测试姓名65",
          id:"456788765678765",
          authority:"user"
        }
      });
      return;
    }

    if (password === 'test' && userName === 'test') {
      res.send({
      code: 2001,
      msg: "org.springframework.validation.BindException",
      userMsg: "验证码不能为空",
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
