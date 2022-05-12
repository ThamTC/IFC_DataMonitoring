const formatPayload = {
  payload: (payload, localISOTime) => {
    return {
      type: payload.type ?? "test",
      system: payload.system ?? "test",
      parameter: payload.parameter ?? "test",
      value: payload.value ?? "test",
      unit: payload.unit ?? "test",
      time: payload.time ?? localISOTime,
      status: payload.status ?? "Null",
      priority: payload.priority ?? "0",
      message: payload.message ?? "test",
      action: payload.action ?? "none",
      contact: payload.contact ?? "",
      timeout: payload.timeout ?? 10,
      count: payload.count ?? 10,
    };
  },
  statisticPayload: (payload, localISOTime) => {
    return {
      type: payload.type,
      system: payload.system,
      parameter: payload.parameter,
      value: payload.value,
      unit: payload.unit,
      priority: payload.priority,
      action: payload.action,
      contact: payload.contact,
      status: payload.status,
      total: 1,
      timeout: payload.timeout,
      count: payload.count,
      isAction: false,
      username: "",
      createAt: localISOTime,
      updateAt: localISOTime,
    };
  },
  doneTaskPayload: (payload, localISOTime) => {
    return {
      type: payload.type,
      system: payload.system,
      parameter: payload.parameter,
      value: payload.value,
      unit: payload.unit,
      contact: payload.contact,
      status: payload.status,
      total: payload.total,
      priority: payload.priority,
      action: payload.action,
      userCheck: payload.userCheck,
      userDone: payload.userDone,
      doneTime: localISOTime,
      createdAt: payload.createAt ?? localISOTime,
      updatedAt: payload.updateAt ?? localISOTime,
    }
  }
};
module.exports = formatPayload;
