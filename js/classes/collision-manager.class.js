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
        const projectiles = this.objects.filter(obj => obj.type === 'projectile');
        const enemies = this.objects.filter(obj => obj.type === 'enemy');
        for (const projectile of projectiles) {
            for (const enemy of enemies) {
                if (CollisionManager.isColliding(projectile, enemy)) {
                    if (typeof projectile.onCollision === 'function') {
                        projectile.onCollision(enemy);
                    }
                    if (typeof enemy.onCollision === 'function') {
                        enemy.onCollision(projectile);
                    }
                }
            }
        }
    }
}