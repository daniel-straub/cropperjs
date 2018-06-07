import {
  ACTION_EAST,
  ACTION_NORTH,
  ACTION_NORTH_EAST, ACTION_NORTH_WEST,
  ACTION_SOUTH,
  ACTION_SOUTH_EAST, ACTION_SOUTH_WEST,
  ACTION_WEST,
} from '../../../src/js/constants';

describe('change (method)', () => {
  let canvasBounds;
  const createPointerMove = (x, y) => ({
    startX: x >= 0 ? canvasBounds.left : canvasBounds.right,
    endX: x >= 0 ? canvasBounds.left + x : canvasBounds.right + x,
    startY: y >= 0 ? canvasBounds.top : canvasBounds.bottom,
    endY: y >= 0 ? canvasBounds.top + y : canvasBounds.bottom + y,
  });
  const CROPBOX_INITIAL_VALUES = {
    left: 100,
    top: 100,
    width: 10,
    height: 10,
  };

  let cropper;

  beforeEach((done) => {
    canvasBounds = document.getElementsByClassName('cropper-canvas')[0].getBoundingClientRect();
    const image = window.createImage();
    cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();
        cropBoxData.left = CROPBOX_INITIAL_VALUES.left;
        cropBoxData.top = CROPBOX_INITIAL_VALUES.top;
        cropBoxData.width = CROPBOX_INITIAL_VALUES.width;
        cropBoxData.height = CROPBOX_INITIAL_VALUES.height;
        cropper.setCropBoxData(cropBoxData);
        done();
      },
    });
  });

  it('should resize cropping box correctly when moving NORTH to SOUTH', () => {
    cropper.pointers[0] = createPointerMove(0, 50);
    cropper.action = ACTION_NORTH;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.top).to.equal(110);
    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(10);
  });

  it('should resize cropping box correctly when moving SOUTH to NORTH', () => {
    cropper.pointers[0] = createPointerMove(0, -50);
    cropper.action = ACTION_SOUTH;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.top).to.equal(60);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(10);
  });

  it('should resize cropping box correctly when moving WEST to EAST', () => {
    cropper.pointers[0] = createPointerMove(50, 0);
    cropper.action = ACTION_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(10);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(110);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving EAST to WEST', () => {
    cropper.pointers[0] = createPointerMove(-50, 0);
    cropper.action = ACTION_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(10);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(60);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving NORTH-EAST to SOUTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(5, 50);
    cropper.action = ACTION_NORTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();
    expect(cropBoxDataNew.top).to.equal(110);
    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(15);
  });

  it('should resize cropping box correctly when moving SOUTH-EAST to NORTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(5, -50);
    cropper.action = ACTION_SOUTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.top).to.equal(60);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(15);
  });

  it('should resize cropping box correctly when moving NORTH-WEST to NORTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(50, 5);
    cropper.action = ACTION_NORTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(5);
    expect(cropBoxDataNew.top).to.equal(105);
    expect(cropBoxDataNew.left).to.equal(110);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving NORTH-EAST to NORTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(-50, 5);
    cropper.action = ACTION_NORTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(5);
    expect(cropBoxDataNew.top).to.equal(105);
    expect(cropBoxDataNew.left).to.equal(60);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving NORTH-WEST to SOUTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(5, 50);
    cropper.action = ACTION_NORTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();
    expect(cropBoxDataNew.top).to.equal(110);
    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.left).to.equal(105);
    expect(cropBoxDataNew.width).to.equal(5);
  });

  it('should resize cropping box correctly when moving SOUTH-WEST to NORTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(5, -50);
    cropper.action = ACTION_SOUTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.top).to.equal(60);
    expect(cropBoxDataNew.left).to.equal(105);
    expect(cropBoxDataNew.width).to.equal(5);
  });

  it('should resize cropping box correctly when moving SOUTH-WEST to SOUTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(50, 5);
    cropper.action = ACTION_SOUTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(15);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(110);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving SOUTH-EAST to SOUTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(-50, 5);
    cropper.action = ACTION_SOUTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(15);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(60);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when resizing outside canvas', () => {
    cropper.pointers[0] = {
      startX: canvasBounds.left - 1,
      endX: canvasBounds.left + 1, // move from left -1 to left +1 --> move 2 but expect move 1
      startY: canvasBounds.top - 5,
      endY: canvasBounds.top + 5, // move from top -5 to top +5 --> move 10 but expect move 5
    };
    cropper.action = ACTION_NORTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(5);
    expect(cropBoxDataNew.top).to.equal(105);
    expect(cropBoxDataNew.left).to.equal(101);
    expect(cropBoxDataNew.width).to.equal(9);
  });
});
