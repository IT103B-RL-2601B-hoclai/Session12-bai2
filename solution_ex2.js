let subscriptions = [
  { subscriptionId: "SUB_001", customerName: "Nguyen Van A", planTier: "PERSONAL", deviceLimit: 3 },
  { subscriptionId: "SUB_002", customerName: "Tran Thi B", planTier: "FAMILY", deviceLimit: 5 },
  { subscriptionId: "SUB_003", customerName: "Le Van C", planTier: "PERSONAL", deviceLimit: 3 }
];

function generateSubscriptionId() {
  const nextNum = subscriptions.length + 1;
  return "SUB_" + String(nextNum).padStart(3, "0");
}

function findSubscriptionIndex(id) {
  return subscriptions.findIndex(item => item.subscriptionId === id);
}

function listSubscriptions() {
  if (!subscriptions || subscriptions.length === 0) {
    console.log("Không có dữ liệu thuê bao!");
    return;
  }
  console.log("=".repeat(75));
  console.log(
    "Mã Thuê Bao".padEnd(12) + " | " +
    "Tên Khách Hàng".padEnd(20) + " | " +
    "Gói Cước".padEnd(12) + " | " +
    "Hạn Mức Thiết Bị".padStart(15)
  );
  console.log("-".repeat(75));
  subscriptions.forEach(sub => {
    console.log(
      sub.subscriptionId.padEnd(12) + " | " +
      sub.customerName.padEnd(20) + " | " +
      sub.planTier.padEnd(12) + " | " +
      String(sub.deviceLimit).padStart(15)
    );
  });
  console.log("=".repeat(75));
}

function addSubscription() {
  const rawName = prompt("Nhập tên khách hàng:");
  if (rawName === null || rawName.trim() === "") {
    console.log("Đã hủy thao tác thêm mới.");
    return;
  }
  const customerName = rawName.trim();

  const rawPlan = prompt("Chọn gói cước (PERSONAL / FAMILY):");
  if (rawPlan === null) {
    console.log("Đã hủy thao tác thêm mới.");
    return;
  }
  const planTier = rawPlan.trim().toUpperCase();

  if (planTier !== "PERSONAL" && planTier !== "FAMILY") {
    console.log("Gói cước không hợp lệ! Chỉ chấp nhận PERSONAL hoặc FAMILY.");
    return;
  }

  const deviceLimit = planTier === "FAMILY" ? 5 : 3;
  const subscriptionId = generateSubscriptionId();

  const newSub = { subscriptionId, customerName, planTier, deviceLimit };
  subscriptions.push(newSub);
  console.log(`Thêm thuê bao thành công với mã ${subscriptionId}!`);
}

function updateSubscription() {
  const rawId = prompt("Nhập mã thuê bao cần cập nhật (ví dụ: SUB_001):");
  if (rawId === null) return;
  const id = rawId.trim().toUpperCase();
  const index = findSubscriptionIndex(id);

  if (index === -1) {
    console.log(`Không tìm thấy thuê bao có mã ${id}`);
    return;
  }

  const current = subscriptions[index];
  const rawPlan = prompt(`Chọn gói cước mới (PERSONAL / FAMILY) - Hiện tại: ${current.planTier}:`);
  if (rawPlan === null) return;
  const newPlan = rawPlan.trim().toUpperCase();

  if (newPlan !== "PERSONAL" && newPlan !== "FAMILY") {
    console.log("Gói cước mới không hợp lệ!");
    return;
  }

  current.planTier = newPlan;
  current.deviceLimit = newPlan === "FAMILY" ? 5 : 3;
  console.log(`Cập nhật thành công! Thuê bao ${id} chuyển sang gói ${newPlan} (Giới hạn: ${current.deviceLimit} thiết bị).`);
}

function deleteSubscription() {
  const rawId = prompt("Nhập mã thuê bao cần hủy (ví dụ: SUB_001):");
  if (rawId === null) return;
  const id = rawId.trim().toUpperCase();
  const index = findSubscriptionIndex(id);

  if (index === -1) {
    console.log(`Không tìm thấy thuê bao có mã ${id}`);
    return;
  }

  const confirmDelete = prompt(`Xác nhận hủy thuê bao ${id}? Nhập 'y' để đồng ý:`);
  if (confirmDelete === null || confirmDelete.trim().toLowerCase() !== "y") {
    console.log("Đã hủy thao tác xóa thuê bao.");
    return;
  }

  subscriptions.splice(index, 1);
  console.log(`Hủy thuê bao thành công, còn lại ${subscriptions.length} thuê bao trong hệ thống.`);
}

function displayMenu() {
  console.log("HỆ THỐNG QUẢN LÝ THUÊ BAO RIKKEISTREAM");
  console.log("1. Thêm thuê bao mới");
  console.log("2. Xem toàn bộ danh sách thuê bao");
  console.log("3. Cập nhật gói cước");
  console.log("4. Hủy thuê bao");
  console.log("5. Thoát chương trình");
}

function main() {
  let isRunning = true;
  do {
    displayMenu();
    const rawChoice = prompt("Nhập lựa chọn của bạn (1-5):");
    if (rawChoice === null) {
      console.log("Thoát chương trình.");
      break;
    }
    const choice = Number(rawChoice.trim());
    switch (choice) {
      case 1:
        addSubscription();
        break;
      case 2:
        listSubscriptions();
        break;
      case 3:
        updateSubscription();
        break;
      case 4:
        deleteSubscription();
        break;
      case 5:
        console.log("Thoát chương trình. Tạm biệt!");
        isRunning = false;
        break;
      default:
        console.log("Lựa chọn không hợp lệ. Vui lòng chọn từ 1 đến 5.");
    }
  } while (isRunning);
}

main();