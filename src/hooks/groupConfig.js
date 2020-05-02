import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import { useAuth } from 'hooks/auth';
import { UPDATE_GROUP_CONFIG } from 'gql/mutations';

const prepare = (groupId, data) => {
  return {
    groupId,
    groupData: data,
  };
};

export default (group) => {
  const [form] = Form.useForm();
  const { accessToken } = useAuth();
  // Update mutation
  const [updateGroup] = useMutation(UPDATE_GROUP_CONFIG, {
    context: {
      headers: {
        accessToken,
      },
    },
  });
  // Initial group state
  const [groupId, setGroupId] = useState(null);
  const [refGroup, setRefGroup] = useState({});
  const [canSave, setCanSave] = useState(false);
  // Helpers
  const formKeys = Object.keys(refGroup);
  const getFormValues = () => form.getFieldsValue(formKeys);
  const validateForm = () => form.validateFields(formKeys);
  const errorsCount = async () => {
    try {
      await validateForm();
      return 0;
    } catch (err) {
      const { errorFields } = err;
      return errorFields.length;
    }
  };
  const updateCanSave = async () => {
    console.log('-------------');
    const noErrors = (await errorsCount()) === 0;
    const changed = !isEqual(refGroup, getFormValues());
    console.log(refGroup);
    console.log(getFormValues());
    console.log(changed);
    setCanSave(noErrors && changed);
    console.log('-------------');
  };

  // Exosed functions
  const reset = () => {
    form.setFieldsValue(refGroup);
    updateCanSave();
  };
  const save = (values) => {
    const variables = prepare(groupId, values);
    updateGroup({
      variables,
    });
  };
  const onChange = async () => {
    updateCanSave();
  };

  useEffect(() => {
    reset();
    validateForm();
    updateCanSave();
  }, [refGroup]);

  useEffect(() => {
    setGroupId(group.id);
    setRefGroup({
      name: group.name,
      baselineId: group.baselineId,
      cruiserId: group.cruiserId,
      uiConfig: omit(group.uiConfig, '__typename'),
    });
  }, [group]);
  return { form, onChange, reset, save, canSave };
};
