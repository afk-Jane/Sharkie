/**
 * @class CollisionManager
 * Handles collision detection between registered game objects.
 * Uses Axis-Aligned Bounding Box (AABB) collision logic.
 */
class CollisionManager {
    constructor() {
        /**
         * @type {GameObject[]}
         * All registered game objects that should be checked for collisions.
         */
        this.objects = [];
    }

    /**
     * Register a game object for collision detection.
     * @param {GameObject} gameObject - Object with x, y, width, height and optional onCollision method.
     */
    register(gameObject) {
        this.objects.push(gameObject);
    }

    /**
     * Unregister a game object from collision detection (e.g. after destruction).
     * @param {GameObject} gameObject 
     */
    unregister(gameObject) {
        this.objects = this.objects.filter(obj => obj !== gameObject);
    }

    /**
     * Clear all registered objects (e.g. when restarting a level).
     */
    clear() {
        this.objects = [];
    }

    /**
     * Static method to check Axis-Aligned Bounding Box (AABB) collision between two objects.
     * @param {GameObject} obj1 - First object
     * @param {GameObject} obj2 - Second object
     * @returns {boolean} Whether the two objects are colliding
     */
    static isColliding(obj1, obj2) {
        return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
        );
    }

    /**
    * Checks for collisions between all projectiles and enemies.
    * Calls onCollision(other) on both objects if a collision occurs.
    * Projectiles are objects with type === 'projectile'.
    * Enemies are objects with type === 'enemy'.
     */
    checkCollisions() {
        const barriers = this.objects.filter(obj => obj.type === 'barrier');
        const projectiles = this.objects.filter(obj => obj.type === 'projectile');
        const enemyProjectiles = this.objects.filter(obj => obj.type === 'enemyProjectile');
        const enemies = this.objects.filter(obj => obj.type === 'enemy');
        const players = this.objects.filter(obj => obj.type === 'player');
        const melees = this.objects.filter(obj => obj.type === 'melee');
        const collectables = this.objects.filter(obj => obj.type === 'collectable');
        for (const player of players) {
            for (const enemy of enemies) {
                if (CollisionManager.isColliding(player, enemy)) {
                    const dangerous = typeof enemy.isDangerousToPlayer === 'function'
                        ? enemy.isDangerousToPlayer()
                        : true;
                    if (dangerous) {
                        player.onCollision?.(enemy);
                        enemy.onCollision?.(player);
                    }
                }
            }
        }
        for (const player of players) {
            for (const enemyProjectile of enemyProjectiles) {
                if (CollisionManager.isColliding(player, enemyProjectile)) {
                    player.onCollision?.(enemyProjectile);
                    enemyProjectile.onCollision?.(player);
                }
            }
        }
        for (const projectile of projectiles) {
            let hit = false;
            for (const enemy of enemies) {
                if (!hit && CollisionManager.isColliding(projectile, enemy)) {
                    projectile.onCollision?.(enemy);
                    enemy.onCollision?.(projectile);
                    hit = true;
                }
            }
            for (const player of players) {
                if (projectile.owner === player && CollisionManager.isColliding(projectile, player)) {
                }
            }
        }
        for (const melee of melees) {
            for (const enemy of enemies) {
                if (CollisionManager.isColliding(melee, enemy)) {
                    melee.onCollision?.(enemy);
                    enemy.onCollision?.(melee);
                }
            }
        }
        for (const player of players) {
            for (const collectable of collectables) {
                if (CollisionManager.isColliding(player, collectable) && !collectable.collected) {
                    collectable.onCollision?.(player);
                }
            }
        }
        for (const player of players) {
            for (const barrier of barriers) {
                if (typeof barrier.isColliding === 'function' && barrier.isColliding(player)) {
                    player.onBarrierCollision?.(barrier);
                }
            }
        }
    }
}