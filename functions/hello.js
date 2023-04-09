exports.handler = async function(event, contex) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name:'miki',
      apge:27,
      email: 'test@tes.com'
    })
  }
}