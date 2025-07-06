import { reactive, toRefs, watch } from 'vue'

export function useReactiveForm(initValues: Record<string, any>, rules: Record<string, any> = {}) {
  const form = reactive({
    values: { ...initValues },
    errors: {} as Record<string, string | null>,
    touched: {} as Record<string, boolean>
  })

  // validate 1 field
  const validateField = (key: string) => {
    const validators = rules[key] || []
    for (const validator of validators) {
      const result = validator(form.values[key])
      if (result !== true) {
        form.errors[key] = result
        return
      }
    }
    form.errors[key] = null
  }

  // validate all
  const validateAll = () => {
    Object.keys(rules).forEach(validateField)
  }

  // watch realtime value change
  Object.keys(initValues).forEach(key => {
    watch(
      () => form.values[key],
      () => {
        form.touched[key] = true
        validateField(key)
      }
    )
  })

  return {
    ...toRefs(form),
    validateField,
    validateAll
  }
}