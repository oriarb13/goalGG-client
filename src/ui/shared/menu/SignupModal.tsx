import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/shadCN/dialog";
import { Button } from "@/ui/shadCN/button";
import { Input } from "@/ui/shadCN/input";
import { Label } from "@/ui/shadCN/label";
import { Checkbox } from "@/ui/shadCN/checkbox";
import { Separator } from "@/ui/shadCN/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadCN/select";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRegister } from "@/api/queryHooks/users-query";
import { SportCategoryEnum } from "@/types/enums";
import DotsLoader from "@/assets/animations/DotsLoader";
import { PhoneInput } from "../phone-input";
import { CountrySelector } from "../mapbox/CountrySelector";
import { CitySelector } from "../mapbox/CItySelector";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLoginModal: () => void;
}

// Define the validation schema using Zod
const signUpSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    phonePrefix: z.string().min(1, { message: "Phone prefix is required" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    sportCategory: z.enum(
      [SportCategoryEnum.FOOTBALL, SportCategoryEnum.BASKETBALL],
      {
        required_error: "Sport category is required",
      }
    ),
    yearOfBirth: z
      .string()
      .regex(/^\d{4}$/, { message: "Valid birth year is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    city: z.string().min(2, { message: "City is required" }),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to terms and conditions",
    }),
    countryCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpModal = ({
  isOpen,
  onClose,
  openLoginModal,
}: SignUpModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    phonePrefix: "+972", // Default phone prefix
    phoneNumber: "", // Actual phone number
    email: "",
    password: "",
    confirmPassword: "",
    sportCategory: SportCategoryEnum.FOOTBALL,
    yearOfBirth: "",
    country: "",
    city: "",
    agreeToTerms: false,
    countryCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: register, isPending: isRegisterLoading } = useRegister();
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
    if (errors.agreeToTerms) {
      setErrors((prev) => ({ ...prev, agreeToTerms: "" }));
    }
  };

  const handlePhoneChange = (
    value: string,
    metadata?: { prefix: string; number: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
      phonePrefix: metadata?.prefix || prev.phonePrefix,
      phoneNumber: metadata?.number || prev.phoneNumber,
    }));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleCountryChange = (value: string, countryCode?: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
      countryCode: countryCode || "",
      // Clear city when country changes
      city: "",
    }));

    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
    if (errors.city) {
      setErrors((prev) => ({ ...prev, city: "" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    try {
      signUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare the data for submission with the phone object
      const submitData = {
        ...formData,
        yearOfBirth: parseInt(formData.yearOfBirth, 10),
        phone: {
          prefix: formData.phonePrefix,
          number: formData.phoneNumber,
        },
        // Remove the extra fields that are not needed in the API
        phonePrefix: undefined,
        phoneNumber: undefined,
        countryCode: undefined,
      };

      await register(submitData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsFailed(false);
        setErrors({});
        openLoginModal();
      }, 5000);
    } catch (error) {
      console.log("Registration error:", error);
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate years for dropdown (from current year - 100 to current year - 5)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 80 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="top-110 max-h-[90vh] overflow-y-auto pr-14 text-gray-600 bg-[linear-gradient(168deg,#D6CE15_0%,#D6CE15_30%,#A4A71E_50%,#53900F_80%,#1F6521_100%)]">
        {" "}
        <DialogHeader className="px-1">
          <DialogTitle className="text-xl font-bold">
            {t("signup.title")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 flex">
            <p className="text-sm">{t("signup.alreadyHaveAccount")}</p>
            <Separator orientation="vertical" className="mx-2" />
            <p
              className="text-sm hover:underline hover:text-gray-500 cursor-pointer"
              onClick={openLoginModal}
            >
              {t("signup.login")}
            </p>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("signup.firstNameLabel")}</Label>
              <Input
                className="text-black placeholder:text-gray-600"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("signup.firstNamePlaceholder")}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t("signup.lastNameLabel")}</Label>
              <Input
                className="text-black placeholder:text-gray-600"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("signup.lastNamePlaceholder")}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("signup.phoneLabel")}</Label>
            <PhoneInput
              className="border-gray-400"
              value={formData.phone}
              onChange={handlePhoneChange}
              international
              initialValueFormat="national"
              defaultCountry="IL"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("signup.emailLabel")}</Label>
            <Input
              className="text-black placeholder:text-gray-600"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("signup.emailPlaceholder")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("signup.passwordLabel")}</Label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  className="text-black placeholder:text-gray-600 pr-10"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("signup.passwordPlaceholder")}
                />
                <Button
                  variant="link"
                  className="absolute right-0 top-0 h-full px-3 text-gray-600"
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t("signup.confirmPasswordLabel")}
            </Label>
            <Input
              className={cn(
                "text-black placeholder:text-gray-600",
                errors.confirmPassword && "border-red-500"
              )}
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t("signup.confirmPasswordPlaceholder")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sportCategory">
                {t("signup.sportCategoryLabel")}
              </Label>
              <Select
                value={formData.sportCategory}
                onValueChange={(value) =>
                  handleSelectChange("sportCategory", value)
                }
              >
                <SelectTrigger className="text-black">
                  <SelectValue
                    placeholder={t("signup.sportCategoryPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SportCategoryEnum.FOOTBALL}>
                    {t("signup.sportFootball")}
                  </SelectItem>
                  <SelectItem value={SportCategoryEnum.BASKETBALL}>
                    {t("signup.sportBasketball")}
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.sportCategory && (
                <p className="text-xs text-red-500">{errors.sportCategory}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearOfBirth">
                {t("signup.yearOfBirthLabel")}
              </Label>
              <Select
                value={formData.yearOfBirth}
                onValueChange={(value) =>
                  handleSelectChange("yearOfBirth", value)
                }
              >
                <SelectTrigger className="max-w-[188px]">
                  <SelectValue
                    placeholder={t("signup.yearOfBirthPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.yearOfBirth && (
                <p className="text-xs text-red-500">{errors.yearOfBirth}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CountrySelector
              value={formData.country}
              onChange={handleCountryChange}
              error={errors.country}
              label="signup.countryLabel"
              placeholder="signup.countryPlaceholder"
            />

            <CitySelector
              value={formData.city}
              onChange={handleCityChange}
              countryCode={formData.countryCode}
              error={errors.city}
              label="signup.cityLabel"
              placeholder="signup.cityPlaceholder"
              disabled={!formData.countryCode}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={handleCheckboxChange}
            />
            <Label
              htmlFor="agreeToTerms"
              className="text-sm font-normal leading-none"
            >
              {t("signup.agreeToTerms")}
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-500">{errors.agreeToTerms}</p>
          )}

          <DialogFooter className="sm:justify-between mt-10">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                onClose();
                setIsSuccess(false);
                setIsFailed(false);
                setErrors({});
              }}
              disabled={isLoading}
              className="text-gray-600 hover:text-gray-300 cursor-pointer w-[100px]"
            >
              {t("common.cancel")}
            </Button>

            <Button
              type="submit"
              disabled={isRegisterLoading}
              className="text-gray-600 hover:text-gray-300 cursor-pointer w-[100px]"
            >
              {isRegisterLoading ? <DotsLoader size={5} /> : t("common.submit")}
            </Button>
          </DialogFooter>
          {isFailed && (
            <p className="text-xl pt-5 text-center text-red-500">
              {t("signup.failed")}
            </p>
          )}
          {isSuccess && (
            <p className="text-xl pt-5 text-center text-amber-500">
              {t("signup.userCreatedSuccessfully")}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
