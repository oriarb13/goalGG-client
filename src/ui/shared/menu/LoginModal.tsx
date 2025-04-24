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
import { Separator } from "@/ui/shadCN/separator";
import { Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick?: () => void;
}

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginModal = ({
  isOpen,
  onClose,
  onSignUpClick,
}: LoginModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    try {
      loginSchema.parse(formData);
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

    setIsLoading(true);

    try {
      // Authentication logic would go here
      // For demo purposes, we're just simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login submitted with data:", formData);

      // On successful login
      onClose();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    onClose();
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-gray-600 bg-[linear-gradient(168deg,#D6CE15_0%,#D6CE15_30%,#A4A71E_50%,#53900F_80%,#1F6521_100%)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t("loginModal.login")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 flex">
            <p className="text-sm">{t("loginModal.dontHaveAccountYet")}</p>
            <Separator orientation="vertical" className="mx-2" />
            <p
              className="text-sm hover:underline hover:text-gray-500 cursor-pointer"
              onClick={handleSignUpClick}
            >
              {t("loginModal.clickHere")}
            </p>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("form.email")}</Label>
            <Input
              className="text-black placeholder:text-gray-600"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form.email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("form.password")}</Label>
              <Button
                variant="link"
                className="text-xs hover:underline hover:text-gray-500 cursor-pointer"
                type="button"
              >
                {t("form.forgotPassword")}
              </Button>
            </div>
            <div className="relative">
              <Input
                className="text-black placeholder:text-gray-600 pr-10"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={t("form.password")}
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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <DialogFooter className="sm:justify-between mt-10">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-600 hover:text-gray-300 cursor-pointer"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="text-gray-600 hover:text-gray-300 cursor-pointer"
            >
              {isLoading ? t("common.loading") : t("common.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
