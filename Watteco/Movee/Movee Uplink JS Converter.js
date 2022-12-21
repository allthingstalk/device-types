function converter(code) {
  var constants = {
    /* ++ Properties name ++*/
    BATTERY_LEVEL_NAME: 'batteryLevel',
    TEMPERATURE_NAME: 'temperature',
    DATA_TYPE_NAME: 'dataType',
    GX_NAME: 'gx',
    GY_NAME: 'gy',
    GZ_NAME: 'gz',
    PITCH_NAME: 'pitch',
    ROLL_NAME: 'roll',
    BUTTON_PUSHED_NAME: 'buttonPushed',
    /* -- Properties name -- */
  
    /* ++ Data type values ++ */
    DATA_TYPES: {
      ALIVE: 0x01,
      TEMPERATURE: 0x02,
      ALIVE_BUTTON: 0x03,
      SHOCK: 0x04,
      TILT: 0x08,
      ORIENT: 0x10,
      MOTION: 0x20,
      ACTIVITY: 0x40,
      ROTATION: 0x80,
      VIBRATION: 0x86,
      SERVICE: 0xFF,
      VERSION: 0xFE,
    },
    /* -- Data type values -- */
  };

  /* -- Workaround -- */
  var PROPERTIES_IDX = {};
  PROPERTIES_IDX[constants.BATTERY_LEVEL_NAME]=0;
  PROPERTIES_IDX[constants.TEMPERATURE_NAME]=2;
  PROPERTIES_IDX[constants.DATA_TYPE_NAME]=4;
  PROPERTIES_IDX[constants.GX_NAME]=6;
  PROPERTIES_IDX[constants.GY_NAME]=10;
  PROPERTIES_IDX[constants.GZ_NAME]=14;
  PROPERTIES_IDX[constants.PITCH_NAME]=6;
  PROPERTIES_IDX[constants.ROLL_NAME]=10;

  function getValueOfField(source, propertyName) {
      var value = null;
      var idxFrom = PROPERTIES_IDX[propertyName] || 0;
      var idxTo = 0;
    
      if (!source || !propertyName) {
        return value;
      }
    
      switch (propertyName) {
        /** ++ Payload header ++ */
        case constants.BATTERY_LEVEL_NAME:
        case constants.DATA_TYPE_NAME: {
          idxTo = idxFrom + 2;
          var hexString1 = source.substring(idxFrom, idxTo);
    
          if (hexString1) {
            value = hexToUnsigned(hexString1);
          }
    
          break;
        }
    
        case constants.TEMPERATURE_NAME: {
          idxTo = idxFrom + 2;
          var hexString2 = source.substring(idxFrom, idxTo);
    
          if (hexString2) {
            value = hexToSigned(hexString2);
          }
    
          break;
        }
        /** -- Payload header -- */
    
        /** ++ Data When dataType === 4 ++ */
        case constants.GX_NAME:
        case constants.GY_NAME:
        case constants.GZ_NAME:
        /** ++ Data When dataType === 8 ++ */
        case constants.PITCH_NAME:
        case constants.ROLL_NAME: {
          value = payloadVarTo16bitsSignedNumber(source, idxFrom);
          break;
        }
    
        default: {
          break;
        }
      }
    
      return value;
    }

  function payloadVarTo16bitsSignedNumber(payload, fromIdx) {
      var toIdx = fromIdx + 4;
      var hexString3 = payload.substring(fromIdx, toIdx);
      var value = null;
  
      if (hexString3) {
      value = hexToSigned(hexString3);
      }
  
      return value;
  }
  
  function convertRawBatteryToMeaning(rawVal) {
      //value = 0.0031372549 * value + 2.8;
      var value = (100 * rawVal) / 255;
  
      if (value % 1 !== 0) {
      /* convert back to number ((someNumber.toFixed(2))/1) */
      value = (value.toFixed(3)) / 1;
      }
  
      return value;
  }
  
  function hexToSigned(hex) {
      if ((hex.length % 2) !== 0) {
      hex = '0' + hex;
      }
  
      var num = parseInt(hex, 16);
      var nbBits = hex.length / 2 * 8;
      var maxVal = Math.pow(2, nbBits);
  
      if (num > (maxVal / 2 - 1)) {
      num = num - maxVal;
      }
  
      return num;
  }
  
  function hexToUnsigned(hex) {
      if ((hex.length % 2) !== 0) {
      hex = '0' + hex;
      }
  
      return parseInt(hex, 16);
  }

  function decodePayload(payload) {
      var moveePayload = {};
      var dataType = getValueOfField(payload, constants.DATA_TYPE_NAME);
      moveePayload[constants.DATA_TYPE_NAME] = {value: dataType};
      var rawBattery = getValueOfField(payload, constants.BATTERY_LEVEL_NAME);
    
      moveePayload[constants.BATTERY_LEVEL_NAME] = {value: convertRawBatteryToMeaning(rawBattery)};
      moveePayload[constants.TEMPERATURE_NAME] = {value: getValueOfField(payload, constants.TEMPERATURE_NAME)};
    
      switch (dataType) {
        case constants.DATA_TYPES.ALIVE_BUTTON: {
          /* #1063: Data type = 3 (Button pushed) => no data expected but the event has to be generated*/
          moveePayload[constants.BUTTON_PUSHED_NAME] = {value: true};
          break;
        }
        case constants.DATA_TYPES.SHOCK: {
          moveePayload[constants.GX_NAME] = {value: getValueOfField(payload, constants.GX_NAME)};
          moveePayload[constants.GY_NAME] = {value: getValueOfField(payload, constants.GY_NAME)};
          moveePayload[constants.GZ_NAME] = {value: getValueOfField(payload, constants.GZ_NAME)};
          /* #1063: ButtonPushed : boolean. true if the device sent the "button pushed" payload, false otherwise */
          moveePayload[constants.BUTTON_PUSHED_NAME] = {value: false};
          break;
        }
        case constants.DATA_TYPES.TILT: {
          /* #1063: Data type = 08 (TILT) => expected payload data = 2 bytes Pitch (signed) + 2 bytes Roll (signed)*/
          moveePayload[constants.PITCH_NAME] = {value: getValueOfField(payload, constants.PITCH_NAME) * 0.1};
          moveePayload[constants.ROLL_NAME] = {value: getValueOfField(payload, constants.ROLL_NAME) * 0.1};
          /* #1063: ButtonPushed : boolean. true if the device sent the "button pushed" payload, false otherwise */
          moveePayload[constants.BUTTON_PUSHED_NAME] = {value: false};
          break;
        }
        default: {
          /* Not spec --> do nothing */
          break;
        }
      }
      return moveePayload;
  }

  return JSON.stringify(decodePayload(code));
}