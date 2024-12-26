cube(`sensor_data_sensordata`, {
  sql_table: `public.sensor_data_sensordata`,

  data_source: `default`,

  joins: {
    // Add joins if there are related tables, such as a Patient table, in the future.
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
    },

    patient_id: {
      sql: `patient_id`,
      type: `string`,
    },

    timestamp: {
      sql: `timestamp`,
      type: `time`,
    },

    temperature: {
      sql: `temperature`,
      type: `number`,
      description: `Patient's temperature readings`,
    },

    humidity: {
      sql: `humidity`,
      type: `number`,
      description: `Ambient humidity level around the patient`,
    },

    heart_rate: {
      sql: `heart_rate`,
      type: `number`,
      description: `Patient's heart rate in beats per minute`,
    },

    spo2: {
      sql: `spo2`,
      type: `number`,
      description: `Blood oxygen saturation level in percentage`,
    },

    systolic_bp: {
      sql: `systolic_bp`,
      type: `number`,
      description: `Estimated systolic blood pressure`,
    },

    diastolic_bp: {
      sql: `diastolic_bp`,
      type: `number`,
      description: `Estimated diastolic blood pressure`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },

    avg_temperature: {
      sql: `temperature`,
      type: `avg`,
      description: `Average temperature readings`,
    },

    avg_heart_rate: {
      sql: `heart_rate`,
      type: `avg`,
      description: `Average heart rate`,
    },

    min_spo2: {
      sql: `spo2`,
      type: `min`,
      description: `Minimum SpO2 level recorded`,
    },

    max_spo2: {
      sql: `spo2`,
      type: `max`,
      description: `Maximum SpO2 level recorded`,
    },
  },

  pre_aggregations: {
    main: {
      type: `originalSql`,
      refreshKey: {
        every: `1 hour`,
      },
      indexes: {
        main: {
          columns: ['patient_id', 'timestamp'],
        },
      },
    },
  },
});
