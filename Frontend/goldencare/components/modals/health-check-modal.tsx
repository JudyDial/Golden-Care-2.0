"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { BASE_URL } from "@/handler/apiConfig"
/**
 * A modal component that allows users to check their risk of diabetes or hypertension using a predictive model.
 *
 * @remarks
 * The modal contains a form with input fields for age, BMI, HbA1c level, blood glucose level, gender, smoking history, hypertension, and heart disease.
 * The form also contains a dropdown to select the type of assessment (diabetes or hypertension).
 * The component fetches the prediction from the API and displays the result in the modal.
 *
 * @returns A `Dialog` component containing the health check form and result.
 */
export function HealthCheckModal() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const assessmentType = formData.get("assessmentType")
    const apiUrl =
      assessmentType === "diabetes"
        ? `${BASE_URL}/predict-diabetes/`
        : `${BASE_URL}/predict-hypertension/`

    const data = Object.fromEntries(formData.entries())
    delete data.assessmentType // Remove unnecessary key

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const resultData = await response.json()
      setResult(resultData.message)
    } catch (error) {
      setResult("An error occurred while fetching the prediction.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Check Health Risk</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Health Risk Assessment</DialogTitle>
          <DialogDescription>
            Check your risk of diabetes or hypertension using our AI model.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="diabetes">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
            <TabsTrigger value="hypertension">Hypertension</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit}>
            <TabsContent value="diabetes">
              <div className="grid gap-4 py-4">
                <input type="hidden" name="assessmentType" value="diabetes" />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="age" className="text-right">
                    Age
                  </Label>
                  <Input id="age" name="age" type="number" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bmi" className="text-right">
                    BMI
                  </Label>
                  <Input id="bmi" name="bmi" type="number" step="0.1" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="HbA1c_level" className="text-right">
                    HbA1c Level
                  </Label>
                  <Input id="HbA1c_level" name="HbA1c_level" type="number" step="0.1" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="blood_glucose_level" className="text-right">
                    Blood Glucose Level
                  </Label>
                  <Input id="blood_glucose_level" name="blood_glucose_level" type="number" step="0.1" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gender" className="text-right">
                    Gender
                  </Label>
                  <Select name="gender" required>
                    <SelectTrigger placeholder="Select gender" />
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smoking_history" className="text-right">
                    Smoking History
                  </Label>
                  <Select name="smoking_history" required>
                    <SelectTrigger placeholder="Select smoking history" />
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="former">Former</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hypertension" className="text-right">
                    Hypertension
                  </Label>
                  <Input id="hypertension" name="hypertension" type="number" min="0" max="1" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="heart_disease" className="text-right">
                    Heart Disease
                  </Label>
                  <Input id="heart_disease" name="heart_disease" type="number" min="0" max="1" required className="col-span-3" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="hypertension">
              <div className="grid gap-4 py-4">
                <input type="hidden" name="assessmentType" value="hypertension" />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="age" className="text-right">
                    Age
                  </Label>
                  <Input id="age" name="age" type="number" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bmi" className="text-right">
                    BMI
                  </Label>
                  <Input id="bmi" name="bmi" type="number" step="0.1" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="systolic" className="text-right">
                    Systolic BP
                  </Label>
                  <Input id="systolic" name="systolic" type="number" step="1" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="diastolic" className="text-right">
                    Diastolic BP
                  </Label>
                  <Input id="diastolic" name="diastolic" type="number" step="1" min="0" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gender" className="text-right">
                    Gender
                  </Label>
                  <Select name="gender" required>
                    <SelectTrigger placeholder="Select gender" />
                    <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                   </Select>

                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="diabetes" className="text-right">
                    Diabetes
                  </Label>
                  <Input id="diabetes" name="diabetes" type="number" min="0" max="1" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smoking_history" className="text-right">
                    Smoking History
                  </Label>
                  <Select name="smoking_history" required>
                    <SelectTrigger placeholder="Select smoking history" />
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="former">Former</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                   </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="heart_disease" className="text-right">
                    Heart Disease
                  </Label>
                  <Input id="heart_disease" name="heart_disease" type="number" min="0" max="1" required className="col-span-3" />
                </div>
              </div>
            </TabsContent>
            <DialogFooter>
              <Button type="submit">Calculate Risk</Button>
            </DialogFooter>
          </form>
        </Tabs>
        {result && (
          <div className="mt-4 p-4 bg-secondary text-secondary-foreground rounded-md">
            {result}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
