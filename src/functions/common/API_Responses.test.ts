  Responses = require('./API_Responses')


test('Responses should be an object',()=>{
    expect(typeof Responses).toBe('object');
})

test('_200 is working',()=>{
    const res = Responses._200({name:"M ahsan"});
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers["Content-Type"]).toBe('application/json');
})

test('_400 is working',()=>{
    const res = Responses._400({name:"Malik mani"});
    expect(res.statusCode).toBe(400);
    expect(typeof res.body).toBe('string');
    expect(res.headers["Content-Type"]).toBe('application/json');
})