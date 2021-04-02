<template>
  <div class="benchmark">
    <div class="controls">
      <button @click="start">Start</button>
      <span>Active: {{ active }} |</span>
      <span> Total time: {{ totalTime / 1000 }}s |</span>
      <span> Average time: {{ averageTime }}ms</span>
    </div>
    <div class="test-chambers">
      <div class="chamber">
        <component :is="component" :class="data.class" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, computed } from 'vue';

export default {
  props: {
    numberOfRuns: {
      type: Number,
      required: true,
    },
    component: {
      type: Object,
      required: true,
    },
    initializer: {
      type: Function,
      required: true,
    },
    changeFunction: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = ref({ class: '' });
    const active = ref(false);
    const totalTime = ref(0);
    const averageTime = computed(() => totalTime.value / props.numberOfRuns);

    const start = async () => {
      active.value = true;
      data.value = props.initializer();
      totalTime.value = 0;
      let time = 0;

      for (let i = 0; i < props.numberOfRuns; i++) {
        const start = performance.now();
        props.changeFunction(data);
        await nextTick();
        time += performance.now() - start;
      }

      active.value = false;
      totalTime.value = time;
    };

    return { data, active, start, totalTime, averageTime };
  },
};
</script>
