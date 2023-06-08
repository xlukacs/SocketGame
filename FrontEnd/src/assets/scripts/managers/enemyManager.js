var enemies = [];

import { baseEnemy } from "../enemies/baseEnemy.js";

export async function spawnEnemies(scene) {
  for (let i = 0; i < 1; i++) {
    enemies.push(new baseEnemy(scene, "enemy" + i));
  }
}

export async function updateEnemies(scene) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.update(scene);
  }
}
