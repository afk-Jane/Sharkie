
class Barrier extends MovableObject {

    IMAGES_BARRIER = [
        './img/3Background/Barrier/1.png',
        './img/3Background/Barrier/1-2.png',
        './img/3Background/Barrier/1-3.png',
        './img/3Background/Barrier/2.png',
        './img/3Background/Barrier/3.png'
    ];

    defaultSizes = [
        { width: 896, height: 720 }, //y=300
        { width: 896, height: 288 }, //y=0
        { width: 1024, height: 272 }, //y=360
        { width: 1024, height: 512 }, //y=300
        { width: 256, height: 720 } //y=-12
    ];

    static HITBOXES = [
        [
            { x: 8, y: 0, width: 396, height: 196 },
            { x: 404, y: 0, width: 172, height: 172 },
            { x: 576, y: 0, width: 157, height: 276 },
            { x: 733, y: 0, width: 140, height: 208 },
            { x: 8, y: 0, width: 896, height: 172 },
            
            { x: 0,   y: 628, width: 120, height: 148 },
            { x: 120, y: 588,  width: 140, height: 188 },
            { x: 260, y: 544,  width: 160, height: 232 },
            { x: 420, y: 532,  width: 228, height: 244 },
            { x: 648, y: 548,  width: 156, height: 228 },
            { x: 0,   y: 628, width: 874, height: 148 },
            { x: 156, y: 588,  width: 696, height: 188 }
            
        ],
        [
            { x: 8, y: 0, width: 396, height: 196 },
            { x: 404, y: 0, width: 172, height: 172 },
            { x: 576, y: 0, width: 157, height: 276 },
            { x: 733, y: 0, width: 140, height: 208 },
            { x: 8, y: 0, width: 896, height: 172 }
        ],
        [
            { x: 0,   y: 116, width: 120, height: 148 },
            { x: 120, y: 76,  width: 140, height: 188 },
            { x: 260, y: 32,  width: 160, height: 232 },
            { x: 420, y: 20,  width: 228, height: 244 },
            { x: 648, y: 36,  width: 244, height: 228 },
            { x: 892, y: 100, width: 116, height: 164 },
            { x: 0,   y: 116, width: 856, height: 148 },
            { x: 156, y: 76,  width: 824, height: 188 }
        ],
        [
            { x: 16,  y: 248, width: 96,  height: 172 },
            { x: 112, y: 264, width: 96,  height: 156 },
            { x: 208, y: 84,  width: 228, height: 336 },
            { x: 436, y: 20,  width: 128, height: 400 },
            { x: 546, y: 44,  width: 160, height: 376 },
            { x: 692, y: 0,   width: 152, height: 420 },
            { x: 844, y: 192, width: 162, height: 228 },
            { x: 16,  y: 264, width: 992,  height: 160 },
            { x: 208, y: 84,  width: 638, height: 336 }
        ],
        [
            { x: 32, y: 0, width: 204, height: 248 },
            { x: 0, y: 232, width: 232, height: 160 },
            { x: 40, y: 380, width: 176, height: 184 },
            { x: 56, y: 518, width: 200, height: 200 },
        ]
    ];

    type = 'barrier';

    constructor(index, x, y, width = null, height = null) {
        super();
        const imgIndex = Math.max(0, Math.min(this.IMAGES_BARRIER.length - 1, index - 1));
        this.loadImage(this.IMAGES_BARRIER[imgIndex]);
        this.x = x;
        this.y = y;
        const size = this.defaultSizes[imgIndex];
        this.width = width !== null ? width : size.width;
        this.height = height !== null ? height : size.height;
        const scaleX = this.width / size.width;
        const scaleY = this.height / size.height;

        this.hitboxes = Barrier.HITBOXES[imgIndex].map(box => ({
            x: this.x + box.x * scaleX,
            y: this.y + box.y * scaleY,
            width: box.width * scaleX,
            height: box.height * scaleY
        }));
    }

    isColliding(obj) {
        return this.hitboxes.some(box =>
            box.x < obj.x + obj.width &&
            box.x + box.width > obj.x &&
            box.y < obj.y + obj.height &&
            box.y + box.height > obj.y
        );
    }

    drawHitboxes(ctx) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
        this.hitboxes.forEach(box => {
            ctx.strokeRect(box.x, box.y, box.width, box.height);
        });
        ctx.restore();
    }
}