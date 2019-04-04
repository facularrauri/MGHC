<template lang="pug">
  main
    ar-header
    .section
      .columns
        .column.is-2
          ar-left-bar

        .column
          router-view
</template>

<script>
import ArHeader from '@/components/layout/Header'
import ArLeftBar from '@/components/layout/LeftBar'

export default {
  components: { ArHeader, ArLeftBar }
}
</script>
