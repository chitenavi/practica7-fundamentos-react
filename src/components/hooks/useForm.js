import { useState } from 'react';

const useForm = () => {
  const [form, setForm] = useState({
    name: '',
    sale: true,
    tags: [],
    price: 0,
  });

  const handleFormChange = event =>
    setForm({ ...form, [event.target.name]: event.target.value });

  return [form, handleFormChange];
};

export default useForm;
