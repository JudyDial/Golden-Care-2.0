cube(`django_migrations`, {
  sql_table: `public.django_migrations`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    app: {
      sql: `app`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    applied: {
      sql: `applied`,
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
