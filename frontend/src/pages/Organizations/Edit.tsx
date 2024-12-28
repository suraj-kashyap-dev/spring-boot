import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOrganizationApi } from '../../hooks/useOrganization';
import { OrganizationFormValues } from '../../types/organization.types';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Textarea } from '../../components/ui/form-controls/Textarea';
import { Select } from '../../components/ui/form-controls/Select';
import { Input } from '../../components/ui/form-controls/Input';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';

type SubscriptionType = 'FREE' | 'STANDARD' | 'PREMIUM';

const subscriptionTypes: Array<{ value: SubscriptionType; label: string }> = [
  { value: 'FREE', label: 'Free Plan' },
  { value: 'STANDARD', label: 'Standard Plan' },
  { value: 'PREMIUM', label: 'Premium Plan' },
];

const sanitizeSubscriptionType = (type?: string): SubscriptionType => {
  const validTypes: SubscriptionType[] = ['FREE', 'STANDARD', 'PREMIUM'];
  return validTypes.includes(type as SubscriptionType)
    ? (type as SubscriptionType)
    : 'FREE';
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Organization name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  domain: Yup.string()
    .required('Organization domain is required')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      'Please enter a valid domain',
    ),
  subscription_type: Yup.string()
    .required('Subscription type is required')
    .oneOf(['FREE', 'STANDARD', 'PREMIUM'], 'Invalid subscription type'),
  settings: Yup.string().test('valid-json', 'Invalid JSON format', (value) => {
    if (!value) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
});

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { editOrganization, showOrganization, organization, loading } =
    useOrganizationApi();

  useEffect(() => {
    if (id) {
      showOrganization(parseInt(id));
    }
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik<OrganizationFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: organization?.name || '',
      domain: organization?.domain || '',
      subscription_type: sanitizeSubscriptionType(
        organization?.subscriptionType,
      ),
      settings: organization?.settings
        ? JSON.stringify(organization.settings, null, 2)
        : JSON.stringify({ theme: 'light', language: 'en' }, null, 2),
    },
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await editOrganization(parseInt(id), values);
        navigate('/organizations');
      }
    },
  });

  if (loading || !organization) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Organization
          </h2>

          <div className="flex gap-2">
            <Link
              to={'/organizations'}
              className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
            >
              Cancel
            </Link>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              isLoading={loading}
            >
              Save Organization
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white border shadow-sm border-neutral-200/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="name" className="required">
                  Organization Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter organization name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.name && touched.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.name && touched.name && (
                  <ErrorMessage error={errors.name} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain" className="required">
                  Domain
                </Label>

                <Input
                  id="domain"
                  name="domain"
                  type="text"
                  placeholder="Enter organization domain"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.domain}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.domain && touched.domain
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.domain && touched.domain && (
                  <ErrorMessage error={errors.domain} />
                )}
              </div>

              {/* Subscription Type Field */}
              <div className="space-y-2">
                <Label htmlFor="subscription_type" className="required">
                  Subscription Type
                </Label>

                <Select
                  name="subscription_type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subscription_type}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.subscription_type && touched.subscription_type
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                >
                  {subscriptionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
                {errors.subscription_type && touched.subscription_type && (
                  <ErrorMessage error={errors.subscription_type} />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Edit;
