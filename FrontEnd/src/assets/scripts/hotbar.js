function resetActiveStatusForType(hotbar, type) {
  for (let i = 0; i < hotbar.length; i++) {
    const hotbarItem = hotbar[i];
    if (hotbarItem.type == type) hotbarItem.isActive = false;
  }
}

export function activateSlot(hotbar, slot) {
  if (hotbar[slot].type != "empty") {
    resetActiveStatusForType(hotbar, hotbar[slot].type);
    hotbar[slot].isActive = true;
  }
}
