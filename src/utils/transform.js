const transform = (transactions) => {
    const transformedTransactions = transactions.map((transaction) => {
      // console.log(transaction.log_events)
      return {
        block_signed_at: transaction.block_signed_at,
        block_height: transaction.block_height,
        from_address: transaction.from_address,
        to_address: transaction.to_address,
        value: transaction.value,
        fees_paid: transaction.fees_paid,
        events: extractMethods(transaction.log_events),
        tx_hash: transaction.tx_hash,
        log_events: transformLogEvents(transaction.log_events)
      }
    })
    return transformedTransactions
  }
  
  const extractMethods = (logEvents) => {
    const methods = []
    if(logEvents && logEvents.length) {
      logEvents.map((logEvent) => {
        if (logEvent.decoded) {
          methods.push(logEvent.decoded.name)
        }
        return null
      })
    }
    return methods
  }
  
  const transformLogEvents = (logEvents) => {
    if(logEvents && logEvents.length) {
      const newLogEvents = logEvents.map((item) => {
        if (item.decoded) {
          const returnObject = {
            name: item.decoded.name,
            signature: item.decoded.signature,
            contractDecimals: item.sender_contract_decimals,
            contractName: item.sender_name,
            logo: item.sender_logo_url,
            ticker: item.sender_contract_ticker_symbol,
            contractAddress: item.sender_address
          }
    
          const params = item.decoded.params
          if (params) {
            params.map((param) => (returnObject['param_' + param.name] = param.value))
          }
    
          return returnObject
        } else {
          return null
        }
      })
      return newLogEvents
    }
    
  }
  
  export { transform }