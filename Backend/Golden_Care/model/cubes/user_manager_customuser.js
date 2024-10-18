cube(`user_manager_customuser`, {
  sql_table: `public."userManager_customuser"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primary_key: true
    },
    
    user_type: {
      sql: `user_type`,
      type: `string`
    },
    
    is_admin: {
      sql: `is_admin`,
      type: `boolean`
    },
    
    image: {
      sql: `image`,
      type: `string`
    },
    
    email: {
      sql: `email`,
      type: `string`
    },
    
    first_name: {
      sql: `first_name`,
      type: `string`
    },
    
    is_active: {
      sql: `is_active`,
      type: `boolean`
    },
    
    last_name: {
      sql: `last_name`,
      type: `string`
    },
    
    username: {
      sql: `username`,
      type: `string`
    },
    
    password: {
      sql: `password`,
      type: `string`
    },
    
    is_superuser: {
      sql: `is_superuser`,
      type: `boolean`
    },
    
    contact_number: {
      sql: `contact_number`,
      type: `string`
    },
    
    is_staff: {
      sql: `is_staff`,
      type: `boolean`
    },
    
    last_login: {
      sql: `last_login`,
      type: `time`
    },
    
    date_joined: {
      sql: `date_joined`,
      type: `time`
    }
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
