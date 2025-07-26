import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

// Helper function to filter category options
function getFilteredCategoryOptions(productType, options) {
  if (productType === "wallpapers") {
    return options.filter((opt) => opt.productType === "wallpapers");
  }
  if (productType === "blinds") {
    return options.filter(
      (opt) =>
        opt.productType === "blinds" &&
        ["roller", "zebra", "roman"].includes(opt.id)
    );
  }
  if (productType === "curtains") {
    return options.filter(
      (opt) =>
        opt.productType === "curtain" && ["drape", "sheer"].includes(opt.id)
    );
  }
  // Wallpaper Rolls: no category
  if (productType === "wallpaperRolls") {
    return [];
  }
  // Default: show all
  return options;
}

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    // Special case for category select
    if (
      getControlItem.componentType === "select" &&
      getControlItem.name === "category"
    ) {
      // Filter the options based on selected product type
      const filteredOptions = getFilteredCategoryOptions(
        formData.productType,
        getControlItem.options
      );
      // If wallpaperRolls: do not render category select at all
      if (formData.productType === "wallpaperRolls") {
        return null;
      }
      element = (
        <Select
          onValueChange={(value) =>
            setFormData({
              ...formData,
              [getControlItem.name]: value,
            })
          }
          value={value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getControlItem.label} />
          </SelectTrigger>
          <SelectContent>
            {filteredOptions.map((optionItem) => (
              <SelectItem key={optionItem.id} value={optionItem.id}>
                {optionItem.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      return element;
    }

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto">
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => {
          // special-case: skip category select if wallpaperRolls
          if (
            controlItem.name === "category" &&
            formData.productType === "wallpaperRolls"
          ) {
            return null;
          }
          return (
            <div className="grid gap-1.5" key={controlItem.name}>
              <Label className="font-medium">{controlItem.label}</Label>
              {renderInputsByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
