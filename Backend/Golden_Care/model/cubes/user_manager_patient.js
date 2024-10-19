cube(`user_manager_patient`, {
  sql: `SELECT * FROM public."userManager_patient"`,

  dataSource: `default`,

  dimensions: {
    customuser_ptr_id: {
      sql: `customuser_ptr_id`,
      type: `string`,
      primaryKey: true // Marking this as the primary key
    },

    username: {
      sql: `username`,
      type: `string`,
      description: `Patient's username`
    },

    email: {
      sql: `email`,
      type: `string`,
      description: `Patient's email`
    },

    gender: {
      sql: `gender`,
      type: `string`
    },

    location: {
      sql: `location`,
      type: `string`
    },

    date_of_birth: {
      sql: `date_of_birth`,
      type: `time`
    }
  },

  measures: {
    count: {
      type: `count`
    }
  },

  preAggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
