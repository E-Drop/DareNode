import { constants } from './constants.js';
const {RESPONSES} = constants;
const errorsDispatcher = (res, error) => {
  const responseInfo = RESPONSES[error];
  return res.status(responseInfo.CODE).send({
    code: responseInfo.CODE,
    message: responseInfo.MESSAGE
  });
}
export default errorsDispatcher;