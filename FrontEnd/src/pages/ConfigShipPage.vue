<template>
  <q-page class="flex flex-center">
    <div class="shipConfig">
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3 text-grey-7"
        active-color="primary"
        indicator-color="purple"
        align="justify"
      >
        <q-tab name="ship" label="Ship"></q-tab>
        <q-tab name="drones" label="Drones"></q-tab>
        <q-tab name="pet" label="PET"></q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" dark animated class="text-white">
        <q-tab-panel name="ship">
          <q-scroll-area class="bg-dark text-white ship" style="height: 350px">
            <section>
              <h6>Lasers</h6>
              <div class="slots">
                <div class="slot" @drop="drop" @dragover="allowDrop"></div>
                <div class="slot" @drop="drop" @dragover="allowDrop">
                  <div
                    id="item3"
                    class="item"
                    draggable="true"
                    @dragstart="drag"
                  ></div>
                </div>
                <div class="slot" @drop="drop" @dragover="allowDrop"></div>
              </div>
            </section>
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="drones">
          <q-scroll-area
            class="bg-dark text-white rounded-borders drones"
            style="height: 350px"
          >
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="pet">
          <q-scroll-area
            class="bg-dark text-white rounded-borders"
            style="height: 350px"
          >
            pet
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="inventory">
      <div class="slots">
        <div class="slot" @drop="drop" @dragover="allowDrop">
          <div id="item1" class="item" draggable="true" @dragstart="drag"></div>
        </div>

        <div class="slot" @drop="drop" @dragover="allowDrop">
          <div id="item2" class="item" draggable="true" @dragstart="drag"></div>
        </div>

        <div class="slot" @drop="drop" @dragover="allowDrop"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import interact from "interactjs";

export default defineComponent({
  name: "ConfigShipPage",
  setup() {
    return {
      tab: ref("ship"),
    };
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    },
  },
  mounted() {
    // // enable draggables to be dropped into this
    // interact(".dropzone").dropzone({
    //   // only accept elements matching this CSS selector
    //   accept: "#yes-drop",
    //   // Require a 75% element overlap for a drop to be possible
    //   overlap: 0.75,
    //   // listen for drop related events:
    //   ondropactivate: function (event) {
    //     // add active dropzone feedback
    //     event.target.classList.add("drop-active");
    //   },
    //   ondragenter: function (event) {
    //     var draggableElement = event.relatedTarget;
    //     var dropzoneElement = event.target;
    //     // feedback the possibility of a drop
    //     dropzoneElement.classList.add("drop-target");
    //     draggableElement.classList.add("can-drop");
    //     draggableElement.textContent = "Dragged in";
    //   },
    //   ondragleave: function (event) {
    //     // remove the drop feedback style
    //     event.target.classList.remove("drop-target");
    //     event.relatedTarget.classList.remove("can-drop");
    //     event.relatedTarget.textContent = "Dragged out";
    //   },
    //   ondrop: function (event) {
    //     var draggableElement = event.relatedTarget;
    //     draggableElement.textContent = "Dropped";
    //     //var dropzoneElement = event.target;
    //     //var rect = dropzoneElement.getBoundingClientRect();
    //     //var x = rect.left + rect.width / 2;
    //     //var y = rect.top + rect.height / 2;
    //     // interact(draggableElement).snap({
    //     //   mode: "anchor",
    //     //   anchors: [{ x: x, y: y }],
    //     //   range: Infinity,
    //     //   elementOrigin: { x: 0.5, y: 0.5 },
    //     //   endOnly: true,
    //     // });
    //     // interact(draggableElement).draggable({
    //     //   modifiers: [
    //     //     interact.modifiers.restrictRect({
    //     //       restriction: dropzoneElement.parentNode,
    //     //       endOnly: true,
    //     //     }),
    //     //   ],
    //     // });
    //   },
    //   ondropdeactivate: function (event) {
    //     // remove active dropzone feedback
    //     event.target.classList.remove("drop-active");
    //     event.target.classList.remove("drop-target");
    //   },
    // });
    // interact(".drag-drop").draggable({
    //   inertia: true,
    //   modifiers: [
    //     interact.modifiers.restrictRect({
    //       restriction: "self",
    //       endOnly: true,
    //     }),
    //   ],
    //   autoScroll: true,
    //   // dragMoveListener from the dragging demo above
    //   listeners: {
    //     move(event) {
    //       var target = event.target;
    //       // keep the dragged position in the data-x/data-y attributes
    //       var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    //       var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    //       // translate the element
    //       target.style.transform = "translate(" + x + "px, " + y + "px)";
    //       // update the posiion attributes
    //       target.setAttribute("data-x", x);
    //       target.setAttribute("data-y", y);
    //     },
    //   },
    // });
  },
});
</script>

<style lang="scss" scoped>
section {
  background-color: lightgray;
  .slots {
    display: flex;
    flex-direction: row;
    gap: 2px;
    .slot {
      width: 30px;
      height: 30px;
      border: 1px solid gray;
      .item {
        width: 26px;
        height: 26px;
        margin: 1px;
        background-color: red;
      }
    }
  }
}

.inventory {
  width: 200px;
  .slots {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    .slot {
      width: 30px;
      height: 30px;
      border: 1px solid gray;
      .item {
        width: 26px;
        height: 26px;
        margin: 1px;
        background-color: red;
      }
    }
  }
}
</style>

<style>
#outer-dropzone {
  /* height: 140px; */
}

#inner-dropzone {
  /* height: 80px; */
}

.dropzone {
  background-color: #bfe4ff;
  border: dashed 4px transparent;
  border-radius: 4px;
  margin: 10px auto 30px;
  padding: 10px;
  width: 80%;
  transition: background-color 0.3s;
}

.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: #29e;
  border-color: #fff;
  border-style: solid;
}

.drag-drop {
  display: inline-block;
  min-width: 40px;
  padding: 2em 0.5em;
  margin: 1rem 0 0 1rem;

  color: #fff;
  background-color: #29e;
  border: solid 2px #fff;

  touch-action: none;
  transform: translate(0px, 0px);

  transition: background-color 0.3s;
}

.drag-drop.can-drop {
  color: #000;
  background-color: #4e4;
}
</style>
