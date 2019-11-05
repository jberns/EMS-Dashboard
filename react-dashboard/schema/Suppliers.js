cube(`Suppliers`, {
  sql: `SELECT * FROM public.suppliers`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt, email]
    }
  },
  
  dimensions: {
    email: {
      sql: `email`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    company: {
      sql: `company`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  }
});
