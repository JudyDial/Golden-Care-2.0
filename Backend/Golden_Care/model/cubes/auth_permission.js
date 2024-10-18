cube(`auth_permission`, {
  sql_table: `public.auth_permission`,
  
  data_source: `default`,
  
  joins: {
    django_content_type: {
      sql: `${CUBE}.content_type_id = ${django_content_type}.id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    codename: {
      sql: `codename`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
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
