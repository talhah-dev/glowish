import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";

export default function DonateModal({ isOpen, onOpenChange, modalType }) {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [email, setEmail] = useState("");

    const amounts = [5, 10, 15, 20];

    const handleSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount("");
    };

    const handleCustomChange = (value) => {
        setSelectedAmount(null);
        setCustomAmount(value);
    };

    const getFinalAmount = () => selectedAmount || customAmount;

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
            <ModalContent>
                {(onClose) => (
                    <>
                        {modalType === "donate" && (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-center text-xl font-semibold">
                                    Support Us With a Donation 💖
                                </ModalHeader>
                                <ModalBody className="pb-2">
                                    <div className="grid grid-cols-4 gap-2">
                                        {amounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => handleSelect(amount)}
                                                className={`py-2 px-4 rounded-lg border text-sm font-medium ${selectedAmount === amount
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-black border-gray-300 hover:border-black"
                                                    }`}
                                            >
                                                €{amount}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-sm font-medium text-gray-600">
                                            Or enter custom amount (€)
                                        </label>
                                        <Input
                                            type="number"
                                            min={1}
                                            placeholder="e.g. 25"
                                            value={customAmount}
                                            onValueChange={handleCustomChange}
                                            className="mt-1"
                                        />
                                    </div>
                                </ModalBody>

                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            alert(`Donated €${getFinalAmount()}`);
                                            onClose();
                                        }}
                                        isDisabled={!getFinalAmount()}
                                    >
                                        Donate €{getFinalAmount() || ""}
                                    </Button>
                                </ModalFooter>
                            </>
                        )}

                        {modalType === "subscribe" && (
                            <>
                                <ModalHeader className="text-xl font-semibold text-center">
                                    Join Our Newsletter
                                </ModalHeader>

                                <ModalBody>
                                    <p className="text-center text-gray-600">
                                        Stay updated! Enter your email below and be the first to know about new features and updates.
                                    </p>

                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        label="Email Address"
                                        isRequired
                                        value={email}
                                        onValueChange={setEmail}
                                        className="mt-4"
                                    />
                                </ModalBody>

                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        isDisabled={!email || !email.includes("@")}
                                        onPress={() => {
                                            alert(`Subscribed with: ${email}`);
                                            onClose();
                                            setEmail(""); // reset input
                                        }}
                                    >
                                        Subscribe
                                    </Button>
                                </ModalFooter>
                            </>
                        )}

                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
