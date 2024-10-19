cube(`sensor_data_sensordata`, {
  sql: `SELECT * FROM public.sensor_data_sensordata`,
  
  dataSource: `default`,

  joins: {
    user_manager_patient: {
      sql: `${CUBE}.patient_id = ${user_manager_patient}.customuser_ptr_id`,
      relationship: `belongsTo`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    patient_id: {
      sql: `patient_id`,
      type: `string`
    },
    
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },

    temperature: {
      sql: `temperature`,
      type: `number`,
      description: `Patient's temperature`
    },

    humidity: {
      sql: `humidity`,
      type: `number`,
      description: `Patient's humidity level`
    },

    heart_rate: {
      sql: `heart_rate`,
      type: `number`,
      description: `Patient's heart rate`
    },

    spo2: {
      sql: `spo2`,
      type: `number`,
      description: `Patient's blood oxygen level (SpO2)`
    },

    systolic_bp: {
      sql: `systolic_bp`,
      type: `number`,
      description: `Patient's systolic blood pressure`
    },

    diastolic_bp: {
      sql: `diastolic_bp`,
      type: `number`,
      description: `Patient's diastolic blood pressure`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, timestamp]
    },

    avg_temperature: {
      sql: `temperature`,
      type: `avg`,
      description: `Average temperature across sensor data`
    },

    avg_humidity: {
      sql: `humidity`,
      type: `avg`,
      description: `Average humidity across sensor data`
    },

    avg_heart_rate: {
      sql: `heart_rate`,
      type: `avg`,
      description: `Average heart rate across sensor data`
    },

    avg_spo2: {
      sql: `spo2`,
      type: `avg`,
      description: `Average SpO2 across sensor data`
    },

    avg_systolic_bp: {
      sql: `systolic_bp`,
      type: `avg`,
      description: `Average systolic blood pressure across sensor data`
    },

    avg_diastolic_bp: {
      sql: `diastolic_bp`,
      type: `avg`,
      description: `Average diastolic blood pressure across sensor data`
    }
  },

  preAggregations: {
    // Define pre-aggregations for optimized querying if needed
  }
});
