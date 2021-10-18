import middy from "@middy/core"
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';

export const middyfy = (handler) => {
	return middy(handler).use(middyJsonBodyParser()).use(httpErrorHandler());
};
