import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { X } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Registration logic would go here
      // For demo purposes, we're just simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On successful registration
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    passwordsMatch &&
    formData.agreeToTerms;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t("signup.title")}
          </DialogTitle>
          <DialogDescription>{t("signup.description")}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("signup.fullNameLabel")}</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t("signup.fullNamePlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("signup.emailLabel")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("signup.emailPlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("signup.passwordLabel")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("signup.passwordPlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t("signup.confirmPasswordLabel")}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t("signup.confirmPasswordPlaceholder")}
              required
              className={
                formData.confirmPassword && !passwordsMatch
                  ? "border-red-500"
                  : ""
              }
            />
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-500">
                {t("signup.passwordsMismatch")}
              </p>
            )}
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

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isLoading || !isFormValid}>
              {isLoading ? t("common.loading") : t("signup.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
